'use strict';

app.controller('PostsCtrl', function($scope, $location, Post, Auth) {
  $scope.initialize = function() {
    $scope.posts = Post.all;
    $scope.user = Auth.user;
    $scope.initializePost();
  };

  $scope.initializePost = function() {
    $scope.post = {url: 'http://', title: ''};
  };

  $scope.deletePost = function(postId) {
    Post.delete(postId);
  };

  $scope.submitPost = function() {
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;
    Post.create($scope.post).then(function(ref) {
      $location.path('/posts/' + ref.name());
      $scope.initializePost();
    });
  };

  $scope.initialize();
});
