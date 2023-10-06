import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCommentsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "id must be a string" });
  }

  const db = (await connectDB()).db("forum");
  let results;

  try {
    results = await db
      .collection("comments")
      .find({ parent: new ObjectId(id) })
      .toArray();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internl Server Error" });
  }

  return res.status(200).json(results);
}
