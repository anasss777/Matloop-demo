"use client";

import { Profile } from "@/types/profile";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import Image from "next/image";
import { CarPost, DevicePost, JobPost, RealEstatePost } from "@/types/post";
import PostCard from "@/components/PostCard";
import { useLocale, useTranslations } from "next-intl";
import EDPostCard from "@/components/ElectronicDevices/EDPostCard";
import RSPostCard from "@/components/RealEstate/RSPostCard";
import JobPostCard from "@/components/Job/JobPostCard";
import LoadingPosts from "@/components/LoadingPosts";
import { svgBigUser } from "@/components/svgsPath";

type Props = {
  params: { profile: string };
};

const ProfilePage = ({ params }: Props) => {
  const id = params.profile;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [realEstatePosts, setRealEstatePosts] = useState<RealEstatePost[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const t = useTranslations("profile");
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection("profiles").doc(id);

    const unsubscribe = docRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          setProfile({
            userId: doc.id,
            ...doc.data(),
          } as Profile);
        } else {
          console.log("No such profile!");
        }
      },
      (error) => {
        console.log("Error getting profile:", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (profile && profile.posts) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: CarPost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = profile.posts.map((id) =>
          firebase
            .firestore()
            .collection("posts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as CarPost;
                // Check visibility before setting state
                if (postData.visibility === true && postData.done === false) {
                  // Update the post in the map
                  postsMap = { ...postsMap, [id]: postData };
                  // Convert the posts map to an array and set state
                  setCarsPosts(Object.values(postsMap));
                }
              }
            })
        );

        // Return a cleanup function to unsubscribe from all posts when the component unmounts
        return () =>
          unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.electronicDevicesPosts) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: DevicePost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = profile.electronicDevicesPosts.map((id) =>
          firebase
            .firestore()
            .collection("electronicDevices")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as DevicePost;
                // Check visibility before setting state
                if (postData.visibility === true && postData.done === false) {
                  // Update the post in the map
                  postsMap = { ...postsMap, [id]: postData };
                  // Convert the posts map to an array and set state
                  setDevicesPosts(Object.values(postsMap));
                }
              }
            })
        );

        // Return a cleanup function to unsubscribe from all posts when the component unmounts
        return () =>
          unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.realEstatePosts) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: RealEstatePost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = profile.realEstatePosts.map((id) =>
          firebase
            .firestore()
            .collection("realEstatePosts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as RealEstatePost;
                // Check visibility before setting state
                if (postData.visibility === true && postData.done === false) {
                  // Update the post in the map
                  postsMap = { ...postsMap, [id]: postData };
                  // Convert the posts map to an array and set state
                  setRealEstatePosts(Object.values(postsMap));
                }
              }
            })
        );

        // Return a cleanup function to unsubscribe from all posts when the component unmounts
        return () =>
          unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.jobsPosts) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: JobPost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = profile.jobsPosts.map((id) =>
          firebase
            .firestore()
            .collection("jobsPosts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as JobPost;
                // Check visibility before setting state
                if (postData.visibility === true && postData.done === false) {
                  // Update the post in the map
                  postsMap = { ...postsMap, [id]: postData };
                  // Convert the posts map to an array and set state
                  setJobPosts(Object.values(postsMap));
                }
              }
            })
        );

        // Return a cleanup function to unsubscribe from all posts when the component unmounts
        return () =>
          unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [profile]);

  if (!profile) {
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
        {profile.profileImageSrc ? (
          <Image
            src={profile.profileImageSrc}
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-cover h-20 w-20 rounded-full shadow-lg"
          />
        ) : (
          <span>{svgBigUser}</span>
        )}

        <p>
          {" "}
          <span className={`text-secondary font-bold`}>{t("name")}</span>{" "}
          {`${profile.name}`}
        </p>
        <p>
          {" "}
          <span className={`text-secondary font-bold`}>
            {t("username")}
          </span>{" "}
          {`${profile?.username ? profile?.username : profile?.name}`}
        </p>
        <p>
          {" "}
          <span className={`text-secondary font-bold`}>{t("email")}</span>{" "}
          {`${profile?.email}`}
        </p>
      </div>

      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10 w-full`}
      >
        {[...carsPosts, ...devicesPosts, ...realEstatePosts, ...jobPosts]
          ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .map((post, index) => (
            <div key={index} className={`w-full`}>
              {post.category === "cars" ? (
                <PostCard
                  posterName={post.poster?.name}
                  post={post as CarPost}
                />
              ) : post.category === "electronicDevices" ? (
                <EDPostCard
                  posterName={post.poster?.name}
                  post={post as DevicePost}
                />
              ) : post.category === "realEstates" ? (
                <RSPostCard
                  posterName={post.poster?.name}
                  post={post as RealEstatePost}
                />
              ) : post.category === "jobs" ? (
                <JobPostCard
                  posterName={post.poster?.name}
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

export default ProfilePage;
