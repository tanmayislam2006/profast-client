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
import useAxios from "../Hook/useAxios.jsx";
import useUserData from "../Hook/useUserData.jsx";

const googleProvider = new GoogleAuthProvider();

const ProfastProvider = ({ children }) => {
  // 1️⃣ Firebase Auth State
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(true);
  const axiosInstance = useAxios();

  // 2️⃣ Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);

      // Get JWT from backend
      if (currentUser?.email) {
        axiosInstance.post(
          "/jsonwebtoken",
          { email: currentUser.email },
          { withCredentials: true }
        );
      }

      setFirebaseLoading(false);
    });

    return () => unsubscribe();
  }, [axiosInstance]);

  // 3️⃣ Load User Role from Database
  const { data: user, isPending: userLoading, refetch } = useUserData(firebaseUser?.email);

  // 4️⃣ Combined Loading State
  const loading = firebaseLoading || userLoading;

  // 5️⃣ Auth Actions
  const createAccount = (email, password) => {
    setFirebaseLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setFirebaseLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const loginUser = (email, password) => {
    setFirebaseLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => signOut(auth);

  // 6️⃣ Shared Context Data
  const sharedData = {
    firebaseUser,
    user,
    loading,
    firebaseLoading,
    userLoading,
    googleLogin,
    loginUser,
    createAccount,
    logoutUser,
    refetch,
  };

  return (
    <ProfastContext value={sharedData}>
      {children}
    </ProfastContext>
  );
};

export default ProfastProvider;
