var app = angular.module("githubViewer", []);
(function() {
  var MainController = function($scope, guthub, $interval, $log,
    $anchorScroll, $location) {

    var OnSuccess = function(data) {
      $scope.user = data;
      github.getRepos($scope.user)
        .then(OnLoadRepos, OnError);
    };

    var OnLoadRepos = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();

    };
    var OnError = function(response) {
      $scope.user = "";
      $scope.error = "could not fetch the data.";
    };

    $scope.search = function(username) {
      $log.info("Searching for " + username);
      github.getUser()
        .then(OnSuccess, OnError);

      if (coundownInterval) {
        $interval.cancel(coundownInterval);
      }
    };
    $scope.message = "GitHub Viewer!";
    $scope.username = "angular";
    $scope.countdown = 5;
    $scope.repoSortOrder = "-stargazers_count";
  };
  var decrementCountDown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < -1) {
      $scope.search($scope.username);
    }

    let countdownInterval = null;
    $scope.startCountdown = function() {
      countdownInterval = $interval(decrementCountDown, 1000, $scope.countdown);
    };
    $scope.startCountdown();
  };
  app.controller("MainController", MainController);

}());