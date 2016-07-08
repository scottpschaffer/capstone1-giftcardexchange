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
    ItemFactory.getUser("none").then(function(userData){
      if (userData){
        $scope.person = userData;      
      }
    });
  };

  $scope.getUser();

  let getAllMyQuestions = function(){
    ItemFactory.getMyQuestions().then(function(myQuestions){
      console.log("myQuestions", myQuestions);
      for (let x=0; x<myQuestions.length; x++){
        ItemFactory.getUser(myQuestions[x].originator).then(function(getName){
          myQuestions[x].name = getName.name;
          console.log("getName.name", getName.name);
        });
        ItemFactory.getCard(myQuestions[x].card).then(function(getMerchant){
          myQuestions[x].merchant = getMerchant.merchant;
          console.log("getMerchant.merchant", getMerchant.merchant);
        });
      }
      console.log("myQuestions2", myQuestions);
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

  $scope.deleteQuestion = function(qid){
    ItemFactory.deleteQuestion(qid).then(function(byeQuestion){
      getAllMyQuestions();
    });
  }

});