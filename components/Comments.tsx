"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface IComments {
  parent: string;
}

interface DataType {
  _id: string;
  comment: string;
  author: string;
  parent: string;
}

export default function Comments({ parent }: IComments) {
  const [comment, setComment] = useState("");
  const [datas, setDatas] = useState<DataType[]>([]);

  const getComments = async () => {
    const response = await axios.get(`/api/comments/list?id=${parent}`);
    console.log(response.data);

    setDatas(response.data);
  };

  useEffect(() => {
    getComments();
  }, [parent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post("/api/comments/new", {
        comment,
        parent,
      });
      getComments();
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul className="border border-black p-5 w-[400px]">
        {datas.length > 0
          ? datas.map((data) => {
              return (
                <li className="my-2 border-b-2 py-2" key={data._id}>
                  <p>{data.comment}</p>
                  <span className="text-gray-400 text-sm">{data.author}</span>
                  <span className="pl-4 text-gray-400 text-sm">좋아요</span>
                </li>
              );
            })
          : "댓글 없음"}
      </ul>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="border border-black"
        value={comment}
      />
      <button onClick={handleButtonClick}>댓글 전송</button>
    </div>
  );
}
