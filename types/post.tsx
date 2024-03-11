import { Timestamp } from "firebase/firestore";

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
  poster: any;
  comments?: string[];
  reports: string[];
  isPromoted: boolean;
};
