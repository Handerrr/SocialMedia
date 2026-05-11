from rest_framework import serializers

from .models import User, Post, Comment, Like, Follow, CommentLike

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    posts_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "bio", "profile_pic", "followers_count", "following_count", "posts_count", "followers", "following", "is_following"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save()
        return user

    def get_followers_count(self, obj):
            return obj.followers.count()

    def get_following_count(self, obj):
            return obj.following.count()


    def get_followers(self, obj):
            return [{
                'id': f.follower.id,
                'username': f.follower.username,
            }
                for f in obj.followers.all()
            ]

    def get_following(self, obj):
            return [{
                'id': f.following.id,
                'username': f.following.username,
            }
                for f in obj.following.all()
            ]

    def get_is_following(self, obj):
        request = self.context.get("request")

        if not request or request.user.is_anonymous:
            return False

        return Follow.objects.filter(
            follower=request.user,
            following=obj,
        ).exists()

    def get_posts_count(self, obj):
        return obj.posts.count()

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "content", "image", "likes_count", "comments_count", "created_at"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "user", "post", "content", "created_at", "replies","likes_count" , "parent",]
        read_only_fields = ["user", "post"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_replies(self, obj):
        replies = obj.replies.all().order_by("-created_at")

        return CommentSerializer(
            replies,
            many=True,
            context=self.context
        ).data