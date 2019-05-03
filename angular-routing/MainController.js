(function() {
  var app = angular.module("githubViewer");
  var MainController = function($scope, $interval, $location) {

  var decrementCountDown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < -1) {
      $scope.search($scope.username);
    }
  };

    let countdownInterval = null;
    $scope.startCountdown = function() {
      countdownInterval = $interval(decrementCountDown, 1000, $scope.countdown);
    };
    
    
    $scope.search = function(username) {
      if(countdownInterval)
      {
        $interval.cancel(countdownInterval);
        $scope.countdown=null;
      }
      $location.path("/user/" + username)
    }

    $scope.username = "angular";
    $scope.countdown = 5;
    startCountdown();
    
  };
  app.controller("MainController", MainController);

}());