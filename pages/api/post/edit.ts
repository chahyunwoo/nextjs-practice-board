import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function edit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("빈칸");
    }

    const newRes = { title: req.body.title, content: req.body.content };

    try {
      const db = (await connectDB()).db("forum");
      let results = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: newRes });

      return res.redirect(302, "/list");
    } catch (error) {
      throw new Error();
    }
  }
}
