"use strict";

app.controller("BuyerCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  $scope.cards = [];
  $scope.cardz = [];
  
  let getCardsForSale = function(){
    ItemFactory.getCardsForSale().then(function(allCards){
      console.log("allCards", allCards);
      $scope.cards = allCards;
    });
  };

  getCardsForSale();

  let getMyCards = function(){
    ItemFactory.getMyCards().then(function(allMyCards){
      console.log("allMyCards", allMyCards);
      $scope.cardz = allMyCards;
    });
  };

  getMyCards();

  $scope.detailsAlert = function(details){
    console.log("detai", details);
    alert(details);
  };

  $scope.buyCard = function(theCard){
    ItemFactory.purchaseCard(theCard).then(function(purchase){
      console.log("purchase", purchase);
      getCardsForSale();
      getMyCards();
    });
  };

});