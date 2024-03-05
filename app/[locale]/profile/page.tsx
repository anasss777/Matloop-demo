"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { handleSignOut } from "@/utils/auth";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Profile: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const locale = useLocale();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const docRef = firebase.firestore().collection("profiles").doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <p
        className={`flex flex-col justify-center items-center w-full h-screen`}
      >
        No user is signed in{" "}
        <Link
          href="/sign-up"
          locale={locale}
          className={`btn2 bg-primary hover:bg-primary/50`}
        >
          Sign up
        </Link>
      </p>
    );
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`bg-third`}>
      <h1>Profile</h1>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Phone Number:</strong> {userData.phoneNumber}
      </p>
      <p>
        <strong>Country:</strong> {userData.country}
      </p>

      <button
        onClick={handleSignOut}
        className={`btn2 bg-red-700 hover:bg-red-700/50`}
      >
        Sign out
      </button>
    </div>
  );
};

export default Profile;
