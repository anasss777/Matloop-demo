"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CarPost, DevicePost, JobPost, RealEstatePost } from "@/types/post";
import PostCard from "@/components/PostCard";
import EDPostCard from "@/components/ElectronicDevices/EDPostCard";
import RSPostCard from "@/components/RealEstate/RSPostCard";
import JobPostCard from "@/components/Job/JobPostCard";
import LoadingPosts from "@/components/LoadingPosts";
import { svgBigUser } from "@/components/svgsPath";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Profile: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [realEstatePosts, setRealEstatePosts] = useState<RealEstatePost[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
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

        setCarsPosts(PostsData);
      };
      fetchPosts();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = userData?.electronicDevicesPosts
          ? userData?.electronicDevicesPosts?.map((id: string) =>
              firebase.firestore().collection("electronicDevices").doc(id).get()
            )
          : [];

        const postsSnapshots = await Promise.all(postsPromises);

        const PostsData: DevicePost[] = postsSnapshots?.map(
          (doc) =>
            ({
              ...doc.data(),
            } as DevicePost)
        );

        setDevicesPosts(PostsData);
      };
      fetchPosts();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = userData?.realEstatePosts
          ? userData?.realEstatePosts?.map((id: string) =>
              firebase.firestore().collection("realEstatePosts").doc(id).get()
            )
          : [];

        const postsSnapshots = await Promise.all(postsPromises);

        const PostsData: RealEstatePost[] = postsSnapshots?.map(
          (doc) =>
            ({
              ...doc.data(),
            } as RealEstatePost)
        );

        setRealEstatePosts(PostsData);
      };
      fetchPosts();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = userData?.jobsPosts
          ? userData?.jobsPosts?.map((id: string) =>
              firebase.firestore().collection("jobsPosts").doc(id).get()
            )
          : [];

        const postsSnapshots = await Promise.all(postsPromises);

        const PostsData: JobPost[] = postsSnapshots?.map(
          (doc) =>
            ({
              ...doc.data(),
            } as JobPost)
        );

        setJobPosts(PostsData);
      };
      fetchPosts();
    }
  }, [userData]);

  if (!user) {
    return (
      <div
        className={`flex flex-col gap-5 justify-center items-center w-full h-[50vh]`}
      >
        <p className={`text-secondary font-bold text-xl`}>{t("noUser")}</p>
        <Link
          href="/sign-up"
          locale={locale}
          className={`btn2 bg-primary hover:bg-primary/50`}
        >
          {t("SignUp")}
        </Link>
        <Link
          href="/sign-in"
          locale={locale}
          className={`btn2 bg-primary hover:bg-primary/50`}
        >
          {t("SignIn")}
        </Link>
      </div>
    );
  }

  if (!userData) {
    return <LoadingPosts />;
  }

  return (
    <div
      className={`flex flex-col w-full h-fit justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
        isArabic && "rtl"
      }`}
    >
      <div
        className={`flex flex-col w-fit h-fit justify-center items-center mb-20`}
      >
        {userData.profileImageSrc ? (
          <Image
            src={userData.profileImageSrc}
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-scale-down h-20 w-20 rounded-full shadow-lg"
          />
        ) : (
          <span>{svgBigUser}</span>
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
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {[...carsPosts, ...devicesPosts, ...realEstatePosts, ...jobPosts]
          ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .map((post, index) => (
            <div key={index} className={`w-full`}>
              {post.category === "cars" ? (
                <PostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as CarPost}
                />
              ) : post.category === "electronicDevices" ? (
                <EDPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as DevicePost}
                />
              ) : post.category === "realEstates" ? (
                <RSPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as RealEstatePost}
                />
              ) : post.category === "jobs" ? (
                <JobPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as JobPost}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
