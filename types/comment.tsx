import { Timestamp } from "firebase/firestore";
import { Profile } from "./profile";

export type Comment = {
  id: string;
  commentId: string;
  createdAt: Timestamp;
  content: string;
  commentor: Profile;
  uploadedImages: string[];
  uploadedFiles: string[];
  reports?: string[];
};
