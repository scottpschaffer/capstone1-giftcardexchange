"use strict";

app.factory("ItemFactory", function($q, $http, firebaseURL, AuthFactory){

  // var getMovieList = function(mo){
  //     let movies = [];
  //     return $q(function(resolve, reject){
  //       $http.get(`${omdbURL}?s=${mo}&y=&r=json`)
  //         .success(function(movieObject){
  //           console.log("movieObject", movieObject);
  //           var movieCollection = movieObject;
  //           Object.keys(movieCollection).forEach(function(key){
  //             movieCollection[key].id=key;
  //             movies.push(movieCollection[key]);
  //           })
  //           console.log("movies", movies);
  //           resolve(movies);
  //         }, function(error){
  //           reject(error);
  //     })
  //   })};

  // var postNewMovie = function(newMovie) {
  //   let user = AuthFactory.getUser();
  // console.log("qwerttreweq", newMovie);
  // return $q(function(resolve, reject){
  //   $http.post(
  //       firebaseURL + "movie-scenesters.json",
  //       JSON.stringify({
  //         poster: newMovie.Poster,
  //         title: newMovie.Title,
  //         year: newMovie.Year,
  //         rating: 2,
  //         uid: user.uid,
  //         watched: false
  //       })
  //     )
  //       .success(
  //         function(objectFromFirebase) {
  //           resolve(objectFromFirebase);
  //         });
  // });
  // }; 

var whoAmI = function(){
  let user = AuthFactory.getUser();
  let email = AuthFactory.getEmail();
  console.log("USER: ", user);
  console.log("EMAIL: ", email);
}

var getUser = function(){
  let myUsers;
  let user = AuthFactory.getUser();
  return $q(function(resolve, reject){
    $http.get(`${firebaseURL}users.json?orderBy="uid"&equalTo="${user.uid}"`)
      .success(function(movieObject){
        var movieCollection = movieObject;
        Object.keys(movieCollection).forEach(function(key){
          movieCollection[key].id=key;
          console.log("mio", movieCollection[key]);
          myUsers = movieCollection[key];
        })
        console.log("movieCollection", movieCollection);
        console.log("movieObject", movieObject);
          resolve(myUsers);
        }, function(error){
          reject(error);
        })
  })};


  var postNewUser = function(newUser) {
    let user = AuthFactory.getUser();
    console.log("qwerttreweq", newUser);
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
            console.log("objectFromFirebase", objectFromFirebase);
            resolve(objectFromFirebase);
          });
    })
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
            isDone: false,
            questions: "none"
          })
      )
      .success(
        function(objectFromFirebase) {
          console.log("objectFromFirebase", objectFromFirebase);
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

  var getAllCards = function(){
    let myCards = [];
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}cards.json?orderBy="seller"&equalTo="${user.uid}"`)
        .success(function(cardObject){
          console.log("cardObject", cardObject);
          var cardCollection = cardObject;
          Object.keys(cardCollection).forEach(function(key){
            cardCollection[key].id=key;
            myCards.push(cardCollection[key]);
          })
          console.log("myCards", myCards);
          resolve(myCards);
        }, function(error){
          reject(error);
        })
    })
  };

// var getMyMovieWatchList = function(){
//       let myMovies = [];
//       let user = AuthFactory.getUser();
//       return $q(function(resolve, reject){
//         $http.get(`${firebaseURL}movie-scenesters.json?orderBy="uid"&equalTo="${user.uid}"`)
//           .success(function(movieObject){
//             // console.log("movieObject", movieObject);
//             var movieCollection = movieObject;
//             Object.keys(movieCollection).forEach(function(key){
//               movieCollection[key].id=key;
//               myMovies.push(movieCollection[key]);
//             })
//             console.log("myMovies", myMovies);
//             resolve(myMovies);
//           }, function(error){
//             reject(error);
//       })
//     })};
  
  // var searchWatchList = function() {
  //   let user = AuthFactory.getUser();
  //   console.log("search watchlist user", user)
  //   return $q(function(resolve, reject){
  //     $http.get(`${firebaseURL}movie-scenesters.json?orderBy="uid"&equalTo="${user.uid}"`)
  //       .success(function(objectFromFirebase){
  //         console.log(objectFromFirebase)
  //         var movieCollection = objectFromFirebase;
  //         Object.keys(movieCollection).forEach(function(key){
  //           movieCollection[key].id=key;
  //         });
  //         resolve(movieCollection);
  //       })
  //       .error(function(error){
  //         reject(error);
  //       });
  //   });
  // };

// var deleteMovie = function(movieId) {
//         return $q(function(resolve, reject) {
//             $http
//                 .delete(firebaseURL + "movie-scenesters/" + movieId + ".json")
//                 .success(function(objectFromFirebase) {
//                   console.log("this array after the delete", objectFromFirebase)
//                     resolve(objectFromFirebase)
//                 });
//         });
// };

  return {whoAmI:whoAmI, getUser:getUser, postNewUser:postNewUser, updateUser:updateUser, postNewCard:postNewCard, updateCard:updateCard, getAllCards:getAllCards}
})