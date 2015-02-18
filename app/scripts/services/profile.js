'use strict';

app.factory('Profile', function($window, FIREBASE_URL, $firebase, Post, $q) {
  var ref = new $window.Firebase(FIREBASE_URL);

  var Profile = {
    get: function(userId) {
      return $firebase(ref.child('profile').child(userId)).$asObject();
    },
    getPosts: function(userId) {
      var defer = $q.defer();

      $firebase(ref.child('user_posts').child(userId))
        .$asArray()
        .$loaded()
        .then(function(data){
          var posts = {};

          for (var i = 0, len = data.length; i < len; i++) {
            var value = data[i].$value;
            posts[value] = Post.get(value);
          }
          defer.resolve(posts);
        });

      return defer.promise;
    }
  }

  return Profile;
});
