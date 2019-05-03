(function() {
    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams) {

      var OnSuccess = function(data) {
        $scope.user = data;
        github.getRepos($scope.user)
          .then(OnLoadRepos, OnError);
      };

      var OnLoadRepos = function(data) {
        $scope.repos = data;
      };
      
      var OnError = function(response) {
        $scope.error = "could not fetch data.";
      };

      $scope.username = $routeParams.username;
      $scope.repoSortOrder = "-stargazers_count";
      github.getUser($scope.username).then(OnSuccess,OnError);
    };

    $scope.startCountdown();
    app.controller("UserController", UserController);

}());