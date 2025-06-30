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
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hook/useAxios.jsx";
import useAxiosSecure from "../Hook/useAxiosSecure.jsx";
const googleProvider = new GoogleAuthProvider();

const ProfastProvidor = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
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
      if (currentUser?.email) {
        axiosInstance.post(
          "/jsonwebtoken",
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        );
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosInstance]);
  const { data: userData, isPending ,refetch} = useQuery({
    queryKey: ["user", firebaseUser?.email],
    enabled: !!firebaseUser?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/${firebaseUser.email}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
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
    isPending,
    user,
    refetch
  };
  return <ProfastContext value={sharedData}>{children}</ProfastContext>;
};
export default ProfastProvidor;
