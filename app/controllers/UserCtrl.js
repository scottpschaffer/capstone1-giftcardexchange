"use strict";

app.controller("UserCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, ItemFactory){
  // $scope.navBarShow = true;
  ItemFactory.whoAmI();
  $scope.person = {};
  $scope.myQuestions = [];

  // console.log("sssssssss");

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

  let getAllMyQuestions = function(){
    // let foo1 = [];
    // let foo2 = [];
    ItemFactory.getMyQuestions().then(function(myQuestions){
      console.log("myQuestions-doodoodoo", myQuestions);

    //   for (let x = 0; x < myQuestions.length; x++){
    //     foo1.push(foo2);
    //     // for (let y = 0; y < myQuestions.length; y++){
    //     //   if (myQuestions[y].card)
    //     // }
        
    //     foo1[x].push(myQuestions[x]);
    //     console.log("myQuestions[x].card", myQuestions[x].card);
    //     // for (let y = 0; y < (foo1.length + 1); y++){
    //     //   if (myQuestions[x].card == foo1[x][y])
    //     // }
        
    //   }
    //   console.log("foo1", foo1);
    //   let xx = [];
    //   Object.keys(foo1[0][0]).forEach(function(key){
    //     console.log("foop0[p00[key]", foo1[0][0].card);
    //           // if (cardCollection[key].seller === user.uid){
    //           //   myCards.push(cardCollection[key]);
    //           // }
    //   });
    //   // xx = foo1[0].filter(function (obj) {
    //   //   return obj.card === "-KL7L-isyIwEkt4kMfaf";
    //   // })[0];
    //   console.log("xx", foo1[0][0].card);
    // });
    });
  }

  getAllMyQuestions();
});