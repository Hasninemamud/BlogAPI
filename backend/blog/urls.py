from django.urls import path
from .views import PostListView, PostDetailView, CommentListView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('posts/', PostListView.as_view(), name='post_list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    path('posts/<int:post_id>/comments/', CommentListView.as_view(), name='comment_list'),
]
if settings.DEBUG:  # only serve media in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

