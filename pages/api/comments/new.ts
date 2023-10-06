import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (req.body.comment === "") {
      return res.status(500).json("빈칸 ㄴㄴ");
    }

    if (session === null) {
      return res.status(500).json("로그인 후 작성 가능");
    }

    const newData = {
      comment: req.body.comment,
      author: session.user.email,
      parent: new ObjectId(req.body.parent),
    };

    try {
      const db = (await connectDB()).db("forum");
      let results = await db.collection("comments").insertOne(newData);

      return res.status(200).json("작성 완료");
    } catch (error) {
      return res.status(500).json({ error: "서버 내부 오류입니다." });
    }
  }
}
