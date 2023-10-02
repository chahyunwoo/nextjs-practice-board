import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB()).db("forum");
  let results = await db.collection("post").find().toArray();

  return res.status(200).json(results);
}
