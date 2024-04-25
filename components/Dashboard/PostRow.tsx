import { Timestamp } from "firebase/firestore";
import React from "react";

type Props = {
  postId: string;
  postTitle: string;
  svgDevices: JSX.Element;
  status: string;
  createdAt: Timestamp;
};

const PostRow = ({
  postId,
  postTitle,
  svgDevices,
  status,
  createdAt,
}: Props) => {
  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{postId}</td>
      <td className={`text-gray-400 text-center py-3`}>{postTitle}</td>
      <td className={`text-gray-400 flex justify-center py-3`}>
        <span className={`bg-primary/20 border border-primary p-1 rounded-md`}>
          {svgDevices}
        </span>
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {" "}
        <span
          className={`rounded-md px-1 text-white ${
            status === "active" ? "bg-secondary" : "bg-primary"
          }`}
        >
          {status}
        </span>{" "}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {createdAt.toDate().toLocaleDateString()}
      </td>
    </tr>
  );
};

export default PostRow;
