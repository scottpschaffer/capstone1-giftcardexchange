"use strict";
app.factory("AuthFactory", function(firebaseURL) {
  let ref = new Firebase(firebaseURL);
  let currentUserData = null;
  let currentEmail = null;

  return {
    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      let authData = ref.getAuth();
      return (authData) ? true : false;
    },

    getUser () {
      return currentUserData;
    },

    getEmail () {
      return currentEmail;
    },
    /*
      Authenticate the client via Firebase
     */
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
            console.log("ERROR with Authenticate", error);
          } else {
            console.log("authWithPassword method completed successfully");
            currentUserData = authData;
            currentEmail = credentials.email;
            resolve(authData);
          }
        });
      });
    },

    /*
      Store each Firebase user's id in the `users` collection
     */
    storeUser (authData) {
      let stringifiedUser = JSON.stringify({ uid: authData.uid });

      return new Promise((resolve, reject) => {
        $http
          .post(`${firebaseURL}/users.json`, stringifiedUser)
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    }

  };
});