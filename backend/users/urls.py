from django.urls import path
from .views import PostListCreateView, ToggleLikeView, CommentListCreateView, UserListView, ToggleFollowView, \
    ProfileView, RegisterView, UserPostsView, ProfileUpdateView, UserDetailView, ToggleCommentLikeView, PostDeleteView, create_admin

urlpatterns = [
    path('posts/', PostListCreateView.as_view()),
    path('posts/<int:post_id>/like/', ToggleLikeView.as_view()),
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view()),
    path('users/', UserListView.as_view()),
    path('users/<int:user_id>/follow/', ToggleFollowView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('register/', RegisterView.as_view()),
    path('users/<int:user_id>/posts/', UserPostsView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view()),
    path('profile/update/', ProfileUpdateView.as_view()),
    path ('posts/<int:pk>/delete/', PostDeleteView.as_view()),
    path('comments/<int:comment_id>/like/', ToggleCommentLikeView.as_view()),
    path('create-admin/', create_admin),
]