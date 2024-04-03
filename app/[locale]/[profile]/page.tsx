"use client";

import { Profile } from "@/types/profile";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import Image from "next/image";
import { CarPost, DevicePost } from "@/types/post";
import PostCard from "@/components/PostCard";
import { useLocale, useTranslations } from "next-intl";
import EDPostCard from "@/components/ElectronicDevices/EDPostCard";

type Props = {
  params: { profile: string };
};

const Profile = ({ params }: Props) => {
  const id = params.profile;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
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
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = profile?.posts?.map((id) =>
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
  }, [profile]);

  useEffect(() => {
    if (profile && profile.electronicDevicesPosts) {
      const fetchPosts = async () => {
        // Use Promise.all to fetch all posts concurrently
        const postsPromises = profile?.electronicDevicesPosts?.map((id) =>
          firebase.firestore().collection("electronicDevices").doc(id).get()
        );

        const postsSnapshots = await Promise?.all(postsPromises);

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
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>;
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
        {profile.profileImageSrc ? (
          <Image
            src={profile.profileImageSrc}
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
        {[...carsPosts, ...devicesPosts]
          ?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((post, index) =>
            post.category === "cars" ? (
              <PostCard
                key={index}
                posterName={post.poster.name}
                posterImage={post.poster.profileImageSrc}
                post={post as CarPost}
              />
            ) : (
              <EDPostCard
                key={index}
                posterName={post.poster.name}
                posterImage={post.poster.profileImageSrc}
                post={post as DevicePost}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Profile;
