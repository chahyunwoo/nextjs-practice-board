import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    if (!id) {
      return res.status(400).json({ error: "Missing or invalid id" });
    }

    try {
      const db = (await connectDB()).db("forum");
      let results = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(id) });

      res.status(200).json("삭제완료");
    } catch (error) {
      console.log(error);
    }
  }
}
