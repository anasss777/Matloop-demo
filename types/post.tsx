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
};
