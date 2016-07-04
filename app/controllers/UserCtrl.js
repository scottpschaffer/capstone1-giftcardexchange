"use strict";

app.controller("UserCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  ItemFactory.whoAmI();
  $scope.person = {};
  $scope.myQuestions = [];


  $scope.addUser = function(id) {
    let newUser = $scope.person;
    if (id){
      ItemFactory.updateUser(newUser);
    }else {
      ItemFactory.postNewUser(newUser)
      .then(function successCallback(response){
      });
    }
    
  }; 

  $scope.getUser = function(){
    ItemFactory.getUser().then(function(userData){
      if (userData){
        $scope.person = userData;      
      }
    });
  };

  $scope.getUser();

  let getAllMyQuestions = function(){
    ItemFactory.getMyQuestions().then(function(myQuestions){
      $scope.myQuestions = myQuestions;
    });
  };

  getAllMyQuestions();

  $scope.newResponse = function(qid,cid, qReply, orig){
    ItemFactory.askQuestion(cid, qReply, orig);
    ItemFactory.deleteQuestion(qid).then(function(byeQuestion){
      getAllMyQuestions();
    });    
  };

});