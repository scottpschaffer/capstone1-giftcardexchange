"use strict";

app.controller("BuyerCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  $scope.cards = [];
  $scope.cardz = [];
  
  let getCardsForSale = function(){
    ItemFactory.getCardsForSale().then(function(allCards){
      $scope.cards = allCards;
    });
  };

  getCardsForSale();

  let getMyCards = function(){
    ItemFactory.getMyCards().then(function(allMyCards){
      $scope.cardz = allMyCards;
    });
  };

  getMyCards();

  $scope.detailsAlert = function(details){
    alert(details);
  };

  $scope.buyCard = function(theCard){
    ItemFactory.purchaseCard(theCard).then(function(purchase){
      getCardsForSale();
      getMyCards();
    });
  };

  $scope.askQuestion = function(id){
    ItemFactory.askQuestion(id, $scope.questionBuyer, "none");
    $scope.questionBuyer = "";
  };

});