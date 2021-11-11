import React, { useContext, useState, useEffect } from "react";
import { firebase } from "../initFirebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAdmin(user, login) {
    if (user) {
      return await firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((res) => {
          // Get the ID token which contains the "custom claims" to know about the admin status of the user
          if (!!res.claims.admin) {
            if (!login) setIsAdmin(true);
            else return true;
          }
        });
    }
  }

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebase.auth().signOut();
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      await checkAdmin(user, false);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login,
    checkAdmin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
