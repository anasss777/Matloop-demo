import { Timestamp } from "firebase/firestore";
import { Profile } from "./profile";
import { Comment } from "./comment";

export type CarPost = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  carBrand: string;
  carType: string[];
  priceRange: number[];
  yearRange: number[];
  distanceRange: number[];
  gearType: string[];
  fuelType: string[];
  region: string;
  description: string;
  poster: Profile;
  comments: Comment[];
  reports: string[];
  isPromoted: boolean;
  category: string;
  language: string;
};

export type DevicePost = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  deviceType: string;
  deviceBrand: string;
  priceRange: number[];
  deviceCondition: string[];
  deviceOS: string;
  deviceStorage: string;
  region: string;
  description: string;
  poster: Profile;
  comments: Comment[];
  reports: string[];
  isPromoted: boolean;
  category: string;
  language: string;
};

export type RealEstatePost = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  propertyType: string;
  ownershipType: string;
  rentType: string;
  address: string;
  priceRange: number[];
  numberOfRooms: string;
  ageRange: number[];
  description: string;
  poster: Profile;
  comments: Comment[];
  reports: string[];
  isPromoted: boolean;
  category: string;
  language: string;
};

export type JobPost = {
  postId: string;
  createdAt: Timestamp;
  postTitle: string;
  jobType: string[];
  jobLocation: string[];
  educationLevel: string[];
  salaryRange: number[];
  address: string;
  description: string;
  poster: Profile;
  comments: Comment[];
  reports: string[];
  isPromoted: boolean;
  category: string;
  language: string;
};
