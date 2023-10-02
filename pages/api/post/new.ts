import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("빈칸 ㄴㄴ");
    }

    try {
      const db = (await connectDB()).db("forum");
      let results = await db.collection("post").insertOne(req.body);

      return res.redirect(302, "/list");
    } catch (error) {
      throw new Error();
    }
  }
}
