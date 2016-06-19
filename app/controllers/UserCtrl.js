"use strict";

app.controller("UserCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  // $scope.navBarShow = true;
  ItemFactory.whoAmI();
  $scope.person = {};

  console.log("sssssssss");

  $scope.addUser = function(id) {
    // alert("ooo");
    console.log("$scope.person", $scope.person);
    let newUser = $scope.person;
    if (id){
      ItemFactory.updateUser(newUser);
    }else {
      ItemFactory.postNewUser(newUser)
      .then(function successCallback(response){
        console.log(response);
        // $location.url("/items/list");
      });
    }
    
  }; 

  $scope.getUser = function(){
    console.log("wawa");
    ItemFactory.getUser().then(function(userData){
      console.log("GetUseruserData2", userData);
      if (userData){
        $scope.person = userData;      
      }
    });
  }

  $scope.getUser();

});