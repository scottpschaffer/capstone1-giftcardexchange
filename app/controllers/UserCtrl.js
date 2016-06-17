"use strict";

app.controller("UserCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  // $scope.navBarShow = true;
  ItemFactory.whoAmI();
  $scope.emailAddress = "qqqqq";
});