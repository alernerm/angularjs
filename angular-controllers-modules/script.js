// Code goes here

(function() {

  var app = angular.module("githubViewer", []);


  var MainController = function($scope, $http) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
    }

    var onError = function(reason) {
      $scope.error = "Could not fetch user data";
    };

    $http.get("https://api.github.com/users/shanselman")
      .then(onUserComplete, onError);

    $scope.message = "Hello World!";
  };

  app.controller("MainController", ["$scope", "$http", MainController]);

}());