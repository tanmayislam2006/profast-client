import React, { useEffect, useState } from "react";
import ProfastContext from "./ProfastContext";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.init.js";
const googleProvider = new GoogleAuthProvider();

const ProfastProvidor = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const sharedData = {
    firebaseUser,
    loading,
    setLoading,
    googleLogin,
    loginUser,
    setFirebaseUser,
    createAccount,
    logoutUser,
  };
  return <ProfastContext value={sharedData}>{children}</ProfastContext>;
};
export default ProfastProvidor;
