"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Comments() {
  const [comment, setComment] = useState("");
  const params = useParams();
  const { id } = params ?? {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post("/api/comments/new", { comment, id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>댓글 목록</div>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="border border-black"
      />
      <button onClick={handleButtonClick}>댓글 전송</button>
    </div>
  );
}
