import { Timestamp } from "firebase/firestore";
import { Profile } from "./profile";

export type CarPost = {
  createdAt: Timestamp;
  postTitle: string;
  carBrand: string;
  carType: string;
  priceRange: number[];
  yearRange: number[];
  maxDistance: string;
  gearType: string[];
  fuelType: string[];
  region: string;
  description: string;
  poster: Profile;
  comments?: string[];
  reports: string[];
  isPromoted: boolean;
};
