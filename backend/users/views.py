from django.db.migrations import serializer
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Post, Follow, Like, Comment, User, CommentLike
from .serializers import PostSerializer, CommentSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from django.db.models import Q


class NoPagination(PageNumberPagination):
    page_size = 1000

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering_fields = ['-created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
    # pegando quem o usuário segue
        following_users = Follow.objects.filter(
            follower=user
        ).values_list('following', flat=True)

#Pegando posts das pessoas que o autor segue e dela mesmo
        return Post.objects.filter(author__in=following_users).union(Post.objects.filter(author=user)).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post = super().get_object()

        if post.author != self.request.user:
            raise permissions.PermissionDenied("Você não pode deletar esse Post")
        return post

class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        post = get_object_or_404(Post, id=post_id)

        like = Like.objects.filter(user=user, post=post).first()

        if like:
            like.delete()
            return Response({'message': 'Like Removed'})
        else:
            like = Like.objects.create(user=user, post=post)
            return Response({'message': 'Like Added'})

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NoPagination

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(
            user=self.request.user,
            post_id=post_id
        )

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['username']



class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

class ToggleFollowView(APIView):
        permission_classes = [IsAuthenticated]

        def post(self, request, user_id):
            user = request.user
            target_user = get_object_or_404(User, id=user_id)

            if user == target_user:
                return Response({'message': 'You cannot follow yourself'})

            follow = Follow.objects.filter(
                follower=user,
                following=target_user
            ).first()

            if follow:
                follow.delete()
                return Response({'message': 'You are not following this user'})
            else:
                Follow.objects.create(
                    follower=user,
                    following=target_user
                )
                return Response({'message': 'You are now following this user'})

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(author_id=user_id).order_by('-created_at')

class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes([MultiPartParser, FormParser])

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True, context={'request': request})


        if serializer.is_valid():
           user = serializer.save()
           password = request.data.get('password')
           if password:
               user.set_password(password)
               user.save()

           return Response(UserSerializer(user, context={'request': request}).data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)


class ToggleCommentLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        comment = get_object_or_404(
            Comment,
            id=comment_id
        )

        like = CommentLike.objects.filter(
            user=request.user,
            comment=comment
        ).first()

        if like:
            like.delete()

            return Response({
                'message': 'Like removed'
            })

        CommentLike.objects.create(
            user=request.user,
            comment=comment
        )

        return Response({
            'message': 'Like added'
        })

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def create_admin(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@gmail.com',
            password='12345678'
        )

    return Response({'status': 'admin created'})