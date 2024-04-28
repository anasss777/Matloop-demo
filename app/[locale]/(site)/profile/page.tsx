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
import {
  svgBigUser,
  svgCloseDark,
  svgEditBlue,
  svgImage,
} from "@/components/svgsPath";
import { Profile } from "@/types/profile";
import Popup from "reactjs-popup";
import { updateProfileImage } from "@/utils/userInfo";
import Swal from "sweetalert2";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<Profile | null>(null);
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [realEstatePosts, setRealEstatePosts] = useState<RealEstatePost[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [openEditImage, setOpenEditImage] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const locale = useLocale();
  const t = useTranslations("profile");
  const isArabic = locale === "ar";

  const wait3Second = () => {
    setTimeout(() => {
      setUserLoaded(true);
    }, 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (image: File, profileID: string) => {
    updateProfileImage({
      image,
      profileID,
    });

    Swal.fire({
      text: t("imageUpdated"),
      icon: "success",
      confirmButtonColor: "#4682b4",
      confirmButtonText: t("ok"),
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenEditImage(!openEditImage);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection("profiles").doc(user?.uid);

    const unsubscribe = docRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          setUserData({
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
  }, [user]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: CarPost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = userData.posts?.map((id) =>
          firebase
            .firestore()
            .collection("posts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as CarPost;
                // Check visibility before setting state
                if (postData.visibility === true) {
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
          unsubscribeFunctions?.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: DevicePost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = userData.electronicDevicesPosts?.map(
          (id) =>
            firebase
              .firestore()
              .collection("electronicDevices")
              .doc(id)
              .onSnapshot((doc) => {
                if (doc.exists) {
                  const postData = doc.data() as DevicePost;
                  // Check visibility before setting state
                  if (postData.visibility === true) {
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
          unsubscribeFunctions?.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: RealEstatePost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = userData.realEstatePosts?.map((id) =>
          firebase
            .firestore()
            .collection("realEstatePosts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as RealEstatePost;
                // Check visibility before setting state
                if (postData.visibility === true) {
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
          unsubscribeFunctions?.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const fetchPosts = () => {
        // Initialize an empty posts map
        let postsMap: { [id: string]: JobPost } = {};

        // Use map to create an array of unsubscribe functions for each post
        const unsubscribeFunctions = userData.jobsPosts?.map((id) =>
          firebase
            .firestore()
            .collection("jobsPosts")
            .doc(id)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const postData = doc.data() as JobPost;
                // Check visibility before setting state
                if (postData.visibility === true) {
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
          unsubscribeFunctions?.forEach((unsubscribe) => unsubscribe());
      };

      // Call fetchPosts and store the cleanup function
      const unsubscribe = fetchPosts();

      // Call the cleanup function when the component unmounts
      return () => unsubscribe();
    }
  }, [userData]);

  if (!userData) {
    wait3Second();
    return (
      <div>
        {userLoaded && (
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
        )}
      </div>
    );
  }

  if (!user) {
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
          // There's profile picture
          <div>
            <Image
              src={userData.profileImageSrc}
              alt="Poster profile image"
              height={400}
              width={400}
              className="object-cover h-20 w-20 rounded-full shadow-lg"
            />
            <Popup
              trigger={
                <span
                  className={`relative -top-8 z-10 flex flex-row items-center bg-[#cbdae6] h-fit w-fit p-1 rounded-full border
              border-secondary shadow-Card2 cursor-pointer`}
                >
                  {svgEditBlue}
                </span>
              }
              open={openEditImage}
              onOpen={() => setOpenEditImage(!openEditImage)}
              modal
              nested
              lockScroll
              overlayStyle={{
                background: "#000000cc",
              }}
              contentStyle={{
                width: "90%",
              }}
            >
              <div
                className={`flex flex-col justify-between items-start gap-1 bg-gray-200 m-5 rounded-lg overflow-y-auto max-w-[400px]
                h-[90vh] w-full mx-auto p-2 ${isArabic && "rtl"}`}
              >
                <button
                  onClick={() => setOpenEditImage(!openEditImage)}
                  className={`ring-0 outline-none`}
                >
                  {svgCloseDark}
                </button>

                <div
                  className={`flex flex-col justify-center items-center gap-5 h-full w-full`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Temporary new Profile image"
                      height={1000}
                      width={1000}
                      className={`h-fit w-full object-scale-down`}
                    />
                  ) : (
                    <Image
                      src={userData.profileImageSrc}
                      alt="Temporary new Profile image"
                      height={1000}
                      width={1000}
                      className={`h-fit w-full object-cover`}
                    />
                  )}
                  <label htmlFor={`imageInput${userData.userId}`}>
                    <span
                      className={`flex bg-secondary/30 h-fit w-fit p-1 rounded-full border border-secondary shadow-md cursor-pointer`}
                    >
                      {svgImage}
                    </span>
                  </label>
                  <input
                    type="file"
                    id={`imageInput${userData.userId}`}
                    accept="image/*"
                    className="absolute left-[-9999px]"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>

                <div
                  className={`flex flex-col justify-center items-center w-full`}
                >
                  {imageUrl && selectedImage ? (
                    <button
                      className={`btn2 bg-secondary`}
                      onClick={() =>
                        handleImageUpload(selectedImage, userData.userId)
                      }
                    >
                      {t("save")}
                    </button>
                  ) : (
                    <button
                      disabled
                      className={`h-fit w-fit px-2 py-1 text-white rounded-md bg-secondary/50`}
                    >
                      {t("save")}
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </div>
        ) : (
          // There's no profile picture
          <div>
            <span>{svgBigUser}</span>
            <Popup
              trigger={
                <span
                  className={`relative -top-8 z-10 flex flex-row items-center bg-[#cbdae6] h-fit w-fit p-1 rounded-full border
              border-secondary shadow-Card2 cursor-pointer`}
                >
                  {svgEditBlue}
                </span>
              }
              open={openEditImage}
              onOpen={() => setOpenEditImage(!openEditImage)}
              modal
              nested
              lockScroll
              overlayStyle={{
                background: "#000000cc",
              }}
              contentStyle={{
                width: "90%",
              }}
            >
              <div
                className={`flex flex-col justify-between items-start gap-1 bg-gray-200 m-5 rounded-lg overflow-y-auto max-w-[400px]
                h-[90vh] w-full mx-auto p-2 ${isArabic && "rtl"}`}
              >
                <button
                  onClick={() => setOpenEditImage(!openEditImage)}
                  className={`ring-0 outline-none`}
                >
                  {svgCloseDark}
                </button>
                {imageUrl ? (
                  <div
                    className={`flex flex-col justify-center items-center gap-5 h-full w-full`}
                  >
                    <Image
                      src={imageUrl}
                      alt="Temporary new Profile image"
                      height={1000}
                      width={1000}
                      className={`h-fit w-full object-scale-down`}
                    />
                    <label htmlFor={`imageInput${userData.userId}`}>
                      <span
                        className={`flex bg-secondary/30 h-fit w-fit p-1 rounded-full border border-secondary shadow-md cursor-pointer`}
                      >
                        {svgImage}
                      </span>
                    </label>
                    <input
                      type="file"
                      id={`imageInput${userData.userId}`}
                      accept="image/*"
                      className="absolute left-[-9999px]"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex flex-col justify-center items-center gap-5 h-full w-full`}
                  >
                    <span>{svgBigUser}</span>
                    <label htmlFor={`imageInput${userData.userId}`}>
                      <span
                        className={`flex bg-secondary/30 h-fit w-fit p-1 rounded-full border border-secondary shadow-md cursor-pointer`}
                      >
                        {svgImage}
                      </span>
                    </label>
                    <input
                      type="file"
                      id={`imageInput${userData.userId}`}
                      accept="image/*"
                      className="absolute left-[-9999px]"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                )}

                <div
                  className={`flex flex-col justify-center items-center w-full`}
                >
                  {imageUrl && selectedImage ? (
                    <button
                      className={`btn2 bg-secondary`}
                      onClick={() =>
                        handleImageUpload(selectedImage, userData.userId)
                      }
                    >
                      {t("save")}
                    </button>
                  ) : (
                    <button
                      disabled
                      className={`h-fit w-fit px-2 py-1 text-white rounded-md bg-secondary/50`}
                    >
                      {t("save")}
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </div>
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

export default UserProfile;
