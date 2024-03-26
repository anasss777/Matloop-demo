"use client";

import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { CarPost } from "@/types/post";
import { useEffect, useState } from "react";

type Props = {
  post: CarPost;
};

const JustTesting = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = () => {
      const commentsIds = post?.comments?.map((comment) => comment.id);
      const commentsRefs = commentsIds?.map((commentId) =>
        firebase.firestore().doc(`comments/${commentId}`)
      );

      if (commentsRefs) {
        const commentSnaps = commentsRefs.map((ref) =>
          ref.onSnapshot((snapshot) => {
            const commentData = snapshot.data() as Comment;
            setComments((prevComments) => [
              ...prevComments.filter(
                (comment) => comment.id !== commentData.id
              ),
              commentData,
            ]);
          })
        );

        // Return cleanup function to unsubscribe from the snapshots
        return () => commentSnaps.forEach((unsubscribe) => unsubscribe());
      }
    };

    fetchComments();
  }, [post?.comments]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
};

export default JustTesting;
