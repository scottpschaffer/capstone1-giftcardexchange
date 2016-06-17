"use strict";

app.factory("ItemFactory", function($q, $http, firebaseURL, AuthFactory){

  var getMovieList = function(mo){
      let movies = [];
      return $q(function(resolve, reject){
        $http.get(`${omdbURL}?s=${mo}&y=&r=json`)
          .success(function(movieObject){
            console.log("movieObject", movieObject);
            var movieCollection = movieObject;
            Object.keys(movieCollection).forEach(function(key){
              movieCollection[key].id=key;
              movies.push(movieCollection[key]);
            })
            console.log("movies", movies);
            resolve(movies);
          }, function(error){
            reject(error);
      })
    })};

  var postNewMovie = function(newMovie) {
    let user = AuthFactory.getUser();
  console.log("qwerttreweq", newMovie);
  return $q(function(resolve, reject){
    $http.post(
        firebaseURL + "movie-scenesters.json",
        JSON.stringify({
          poster: newMovie.Poster,
          title: newMovie.Title,
          year: newMovie.Year,
          rating: 2,
          uid: user.uid,
          watched: false
        })
      )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          });
  })
}; 

var whoAmI = function(){
  let user = AuthFactory.getUser();
  let email = AuthFactory.getEmail();
  console.log("USER: ", user);
  console.log("EMAIL: ", email);
}


var getMyMovieWatchList = function(){
      let myMovies = [];
      let user = AuthFactory.getUser();
      return $q(function(resolve, reject){
        $http.get(`${firebaseURL}movie-scenesters.json?orderBy="uid"&equalTo="${user.uid}"`)
          .success(function(movieObject){
            // console.log("movieObject", movieObject);
            var movieCollection = movieObject;
            Object.keys(movieCollection).forEach(function(key){
              movieCollection[key].id=key;
              myMovies.push(movieCollection[key]);
            })
            console.log("myMovies", myMovies);
            resolve(myMovies);
          }, function(error){
            reject(error);
      })
    })};
  
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

var deleteMovie = function(movieId) {
        return $q(function(resolve, reject) {
            $http
                .delete(firebaseURL + "movie-scenesters/" + movieId + ".json")
                .success(function(objectFromFirebase) {
                  console.log("this array after the delete", objectFromFirebase)
                    resolve(objectFromFirebase)
                });
        });
};

  return {whoAmI:whoAmI, getMovieList:getMovieList, postNewMovie:postNewMovie, getMyMovieWatchList:getMyMovieWatchList, deleteMovie:deleteMovie}
})