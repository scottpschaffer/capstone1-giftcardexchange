"use strict";

app.controller("SellerCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  $scope.card = {};
  $scope.cards = [];

  $scope.sellCard = function(id){
    let newCard = $scope.card;
    if (id){
      ItemFactory.updateCard(newCard);
    }else {
      ItemFactory.postNewCard(newCard);
      console.log("postNewCard");
    }
  };

  $scope.getCard = function(){
    ItemFactory.getCard().then(function(cardData){
      if (cardData){
        $scope.card = cardData;
      }
    });
  }

  let getAllCards = function(){
    alert("dddd");
    ItemFactory.getAllCards().then(function(allCards){
      console.log("allCards", allCards);
      // if(allCards){
      //   $scope.card = allCards[0];
        
      // }
      $scope.cards = allCards;
    });
  };

  getAllCards();

  $scope.getUser = function(){
    console.log("wawa");
    ItemFactory.getUser().then(function(userData){
      console.log("GetUseruserData2", userData);
      if (userData){
        $scope.person = userData;      
      }
    });
  }

  $scope.message1 = function(info){
    console.log("info-wawa", info);
  }

});