"use strict";

app.controller("SellerCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  $scope.card = {};
  $scope.cards = [];
  $scope.disable = false;

  $scope.sellCard = function(id){
    let newCard = $scope.card;
    // if (id){
    //   ItemFactory.updateCard(newCard);
    // }else {
      ItemFactory.postNewCard(newCard).then(function(test){
        console.log("test", test);
        getAllCards();
        $scope.card = {};
      });
  };

  $scope.getCard = function(id){
    ItemFactory.getCard(id).then(function(cardData){
      if (cardData){
        $scope.card = cardData;
      }
      $scope.disable = true;
    });
  };

  $scope.editCard = function(id){
    let newCard = $scope.card;
    newCard.id = id;
    console.log("newCard", newCard);
    ItemFactory.updateCard(newCard).then(function(test){
      $scope.disable = false;
      getAllCards();
      $scope.card = {};
    });
  }

  let getAllCards = function(){
    // alert("dddd");
    ItemFactory.getAllCards().then(function(allCards){
      console.log("allCards", allCards);
      $scope.cards = allCards;
    });
  };

  getAllCards();

  $scope.deleteCard = function(id){
    ItemFactory.deleteCard(id).then(function(test){
      getAllCards();
      $scope.card = {};
    });
  }

  $scope.cancelButton = function(){
    $scope.disable = false;
    getAllCards();
    $scope.card = {};
  }

  $scope.questionResponse = function(info){
    console.log("info-wawa", info);
  }

});