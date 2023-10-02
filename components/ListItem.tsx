"use client";

import axios from "axios";
import Link from "next/link";

interface IMongoDBDocument {
  _id: string;
  title: string;
  content: string;
}

interface IListItem {
  results: IMongoDBDocument[];
}

const deletePost = async (e: React.MouseEvent<HTMLSpanElement>, id: string) => {
  try {
    const response = await axios.post(`/api/post/delete/${id}`);
    if (response.status === 200) {
      console.log("Delete successful");

      const parentElement = (e.target as HTMLSpanElement).parentElement;

      if (parentElement) {
        parentElement.style.opacity = "0";

        setTimeout(() => {
          parentElement.style.display = "none";
        }, 150);
      }
    } else {
      console.error("Delete failed:", response.status, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function ListItem({ results }: IListItem) {
  return (
    <div>
      {results.map((result, index) => (
        <div className="list-item" key={index}>
          <Link href={`/detail/${results[index]._id}`}>
            <h4 className="title">{result.title}</h4>
          </Link>
          <Link href={`/edit/${results[index]._id}`} className="text-blue-400">
            수정
          </Link>
          <span
            className="ml-2 text-red-400 cursor-pointer"
            onClick={(e) => deletePost(e, result._id)}
          >
            삭제
          </span>
          <p className="content">1월 1일</p>
        </div>
      ))}
    </div>
  );
}
