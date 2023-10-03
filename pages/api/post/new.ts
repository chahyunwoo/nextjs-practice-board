import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    req.body.author = session?.user?.email;
  }

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
