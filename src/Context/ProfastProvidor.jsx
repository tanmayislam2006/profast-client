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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const googleProvider = new GoogleAuthProvider();

const ProfastProvidor = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
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
  const { data: userData } = useQuery({
    queryKey: ["user", firebaseUser?.email],
    enabled: !!firebaseUser?.email,
    queryFn: async () => {
      const response = await axios.get(
        `https://profast-server-indol.vercel.app/user/${firebaseUser.email}`
      );
      return response.data;
    },
  });
  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [userData]);
  const sharedData = {
    firebaseUser,
    loading,
    setLoading,
    googleLogin,
    loginUser,
    setFirebaseUser,
    createAccount,
    logoutUser,
    user,
  };
  return <ProfastContext value={sharedData}>{children}</ProfastContext>;
};
export default ProfastProvidor;
