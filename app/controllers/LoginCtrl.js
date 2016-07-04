"use strict";

app.controller("LoginCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory){
  let ref = new Firebase(firebaseURL);

  $scope.account = {
    email: "",
    password: ""
  };

  if($location.path() === "/logout"){
    ref.unauth();
    $rootScope.isActive = false;
  }

  $scope.register = () => {
    ref.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    }, (error, userData) => {
      if(error){
      } else{
        $scope.login();
      };
    });
  };


  $scope.login = () => {
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        $rootScope.isActive = true;
        $location.path("/");
        $scope.$apply();
      });
  };

});