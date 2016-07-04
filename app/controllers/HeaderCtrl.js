"use strict";

app.controller("HeaderCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };
});