"use strict";

app.factory("ItemFactory", function($q, $http, firebaseURL, AuthFactory){

var whoAmI = function(){
  let user = AuthFactory.getUser();
  let email = AuthFactory.getEmail();
};

var getUser = function(userName){
  let myUsers;
  let user = AuthFactory.getUser();
  if (userName === "none"){
    userName=user.uid;
    console.log("user.uid", user.uid);
  }
  return $q(function(resolve, reject){
    $http.get(`${firebaseURL}users.json?orderBy="uid"&equalTo="${userName}"`)
      .success(function(movieObject){
        var movieCollection = movieObject;
        Object.keys(movieCollection).forEach(function(key){
          movieCollection[key].id=key;
          myUsers = movieCollection[key];
        });
          resolve(myUsers);
        }, function(error){
          reject(error);
        });
  });
};


  var postNewUser = function(newUser) {
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.post(
        firebaseURL + "users.json",
        JSON.stringify({
          name: newUser.name,
          streetAddress: newUser.streetAddress,
          city: newUser.city,
          state: newUser.state,
          zipCode: newUser.zipCode,
          emailAddress: newUser.emailAddress,
          sellhistory: "none",
          buyhistory: "none",
          uid: user.uid
        })
      )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          });
    });
  }; 

  var updateUser = function(theUser){
    return $q(function(resolve, reject) {
      $http.put(
        firebaseURL + "users/" + theUser.id + ".json",
          JSON.stringify({
            name: theUser.name,
            streetAddress: theUser.streetAddress,
            city: theUser.city,
            state: theUser.state,
            zipCode: theUser.zipCode,
            emailAddress: theUser.emailAddress,
            sellhistory: theUser.sellhistory,
            buyhistory: theUser.buyhistory,
            uid: theUser.uid
          })
     )
      .success(
        function(objectFromFirebase) {
          resolve(objectFromFirebase);
        }
      );
    });
  };

  var postNewCard = function(newCard) {
    let user = AuthFactory.getUser();
    
    return $q(function(resolve, reject){
      $http.post(
          firebaseURL + "cards.json",
          JSON.stringify({
            seller: user.uid,
            buyer: "none",
            merchant: newCard.merchant,
            value: newCard.value,
            expirationDate: newCard.expirationDate,
            details: newCard.details,
            isDone: "For Sale",
            questions: "none"
          })
      )
      .success(
        function(objectFromFirebase) {
          resolve(objectFromFirebase);
        }
      );
    });
  }; 

  var updateCard = function(theCard){
    let user = AuthFactory.getUser();
    
    return $q(function(resolve, reject) {
      $http.put(
        firebaseURL + "cards/" + theCard.id + ".json",
        JSON.stringify({
          seller: user.uid,
          buyer: theCard.buyer,
          merchant: theCard.merchant,
          value: theCard.value,
          expirationDate: theCard.expirationDate,
          details: theCard.details,
          isDone: theCard.isDone,
          questions: theCard.questions
        })
      )
      .success(
        function(objectFromFirebase) {
          resolve(objectFromFirebase);
        }
      );
    });
  };

  var getCard = function(theId){
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}cards/${theId}.json`)
        .success(function(cardObject){
          resolve(cardObject);
        }, function(error){
          reject(error);
        });
    });
  };

  var getAllCards = function(){
    let myCards = [];
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}cards.json`)
        .success(function(cardObject){
          if (cardObject){
            var cardCollection = cardObject;
            Object.keys(cardCollection).forEach(function(key){
              cardCollection[key].id=key;
              if (cardCollection[key].seller === user.uid){
                myCards.push(cardCollection[key]);
              }
            });
          }
          resolve(myCards);
        }, function(error){
          reject(error);
        });
    });
  };

  var deleteCard = function(theId) {
    return $q(function(resolve, reject) {
      $http
        .delete(firebaseURL + "cards/" + theId + ".json")
        .success(function(theResult) {
          resolve(theResult);
        });
    });
  };

  var getCardsForSale = function(){
    let myCards = [];
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}cards.json`)
        .success(function(cardObject){
          var cardCollection = cardObject;
          Object.keys(cardCollection).forEach(function(key){
            cardCollection[key].id=key;
            if (cardCollection[key].buyer === "none"){
              myCards.push(cardCollection[key]);
            }
          });
          resolve(myCards);
        }, function(error){
          reject(error);
        });
    });
  };

  var purchaseCard = function(theCard){
    let user = AuthFactory.getUser();
    
    return $q(function(resolve, reject) {
      $http.put(
        firebaseURL + "cards/" + theCard.id + ".json",
        JSON.stringify({
          seller: theCard.seller,
          buyer: user.uid,
          merchant: theCard.merchant,
          value: theCard.value,
          expirationDate: theCard.expirationDate,
          details: theCard.details,
          isDone: "Sold",
          questions: theCard.questions
        })
      )
      .success(
        function(objectFromFirebase) {
          resolve(objectFromFirebase);
        }
      );
    });
  };

  var getMyCards = function(){
    let myCards = [];
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}cards.json`)
        .success(function(cardObject){
          var cardCollection = cardObject;
          Object.keys(cardCollection).forEach(function(key){
            cardCollection[key].id=key;
            if (cardCollection[key].buyer === user.uid){
              myCards.push(cardCollection[key]);
            }
          });
          resolve(myCards);
        }, function(error){
          reject(error);
        });
    });
  };

  var askQuestion = function(id, question, prospect){
    let user = AuthFactory.getUser();
    let recipient = "";
    let d = new Date();
    getCard(id).then(function(card){
      if (card){
        if (user.uid === card.seller){
          recipient = prospect;
        }else{
          recipient = card.seller;
        }
        return $q(function(resolve, reject) {
          $http.post(
            firebaseURL + "questions.json",
            JSON.stringify({
              card: id,
              recipient: recipient,
              originator: user.uid,
              text: question,
              read: false,
              time: d.getTime()
            })
          )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          });
        }
        );
      }
    });
  };

  var getMyQuestions = function(){
    let myQuestions = [];
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}questions.json`)
        .success(function(questionObject){
          if (questionObject){
            var questionCollection = questionObject;
            Object.keys(questionCollection).forEach(function(key){
              questionCollection[key].id=key;
              if (questionCollection[key].recipient === user.uid){
                myQuestions.push(questionCollection[key]);
              }else{
              }

            });
          }
          resolve(myQuestions);
        }, function(error){
          reject(error);
        });
    });
  };

  var deleteQuestion = function(questionId){
      return $q(function(resolve, reject){
        $http
          .delete(firebaseURL + "questions/" + questionId + ".json")
          .success(function(objectFromFirebase){
            resolve(objectFromFirebase);
          });
      });
    };

  return {whoAmI:whoAmI, getUser:getUser, postNewUser:postNewUser, updateUser:updateUser, postNewCard:postNewCard, updateCard:updateCard, getCard:getCard, getAllCards:getAllCards, deleteCard:deleteCard, getCardsForSale:getCardsForSale, purchaseCard:purchaseCard, getMyCards:getMyCards, askQuestion:askQuestion, getMyQuestions:getMyQuestions, deleteQuestion:deleteQuestion};
});