"use strict";

var app = angular.module("GiftCardApp", ["ngRoute"])
  .constant("firebaseURL","https://schaffer-giftcards1.firebaseio.com/");

  let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(function($routeProvider){
  $routeProvider.
    when('/',{
      templateUrl: 'partials/user-profile.html',
      controller: 'UserCtrl',
       resolve: {isAuth}
    }).
    when('/sell',{
      templateUrl: 'partials/sell-card.html',
      controller: 'SellerCtrl',
       resolve: {isAuth}
     }).
    when('/buy',{
      templateUrl: 'partials/buy-card.html',
      controller: 'BuyerCtrl',
       resolve: {isAuth}
     }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).
    when('/logout', {
      templateUrl: 'partials/buy-card.html',
      controller: "LoginCtrl"
    }).
      otherwise('/');
});


app.run(($location) =>{
  let todoRef = new Firebase("https://schaffer-giftcards1.firebaseio.com/");
  todoRef.unauth();

  todoRef.onAuth(authData =>{
    if(!authData){
      $location.path("/login");
    }
  });
});
