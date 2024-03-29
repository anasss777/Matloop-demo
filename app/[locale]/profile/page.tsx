"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { handleSignOut } from "@/utils/auth";
import Image from "next/image";
import { CarPost } from "@/types/post";
import PostCard from "@/components/PostCard";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Profile: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<CarPost[]>();
  const locale = useLocale();
  const t = useTranslations("profile");
  const isArabic = locale === "ar";

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

  useEffect(() => {
    if (userData) {
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = userData?.posts?.map((id: string) =>
          firebase.firestore().collection("posts").doc(id).get()
        );

        const postsSnapshots = await Promise?.all(postsPromises);

        const PostsData: CarPost[] = postsSnapshots?.map(
          (doc) =>
            ({
              ...doc.data(),
            } as CarPost)
        );

        setPosts(PostsData);
      };
      fetchPosts();
    }
  }, [userData]);

  if (!user) {
    return (
      <p
        className={`flex flex-col gap-5 justify-center items-center w-full h-screen`}
      >
        No user is signed in{" "}
        <Link
          href="/sign-up"
          locale={locale}
          className={`btn2 bg-primary hover:bg-primary/50`}
        >
          Sign up
        </Link>
        <Link
          href="/sign-in"
          locale={locale}
          className={`btn2 bg-primary hover:bg-primary/50`}
        >
          Sign in
        </Link>
      </p>
    );
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`flex flex-col w-full h-fit justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
        isArabic && "rtl"
      }`}
    >
      <div
        className={`flex flex-col w-fit h-fit justify-center items-center shadow-lg p-5 rounded-lg bg-secondary/20`}
      >
        {userData.profileImageSrc ? (
          <Image
            src={userData.profileImageSrc}
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-scale-down h-24 w-24 rounded-full shadow-lg"
          />
        ) : (
          <Image
            src="/images/profile.png"
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-scale-down h-24 w-24"
          />
        )}

        <p>
          {" "}
          <span className={`text-secondary font-bold`}>{t("name")}</span>{" "}
          {`${userData.name}`}
        </p>
        <p>
          {" "}
          <span className={`text-secondary font-bold`}>
            {t("username")}
          </span>{" "}
          {`${userData?.username}`}
        </p>
        <p>
          {" "}
          <span className={`text-secondary font-bold`}>{t("email")}</span>{" "}
          {`${userData?.email}`}
        </p>
      </div>

      <div
        className={`flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 justify-center items-start gap-10`}
      >
        {posts?.map((post, index) => (
          <PostCard
            key={index}
            posterName={post.poster.name}
            posterImage={post.poster.profileImageSrc}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
