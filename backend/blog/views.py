from django.shortcuts import render
from rest_framework import generics, permissions, filters
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework.throttling import ScopedRateThrottle
# Create your views here.

class PostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author__username']
    ordering_fields = ['created_at', 'comments_count']  # allow ordering by date & comments
    ordering = ['-created_at']  # default ordering (latest first)
    # throttle_classes = [ScopedRateThrottle]
    # throttle_scope = 'custom_burst'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_update(self, serializer):
        if self.request.user == self.get_object().author:
            serializer.save()

class CommentListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs['post_id']).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user, post_id=self.kwargs['post_id'])