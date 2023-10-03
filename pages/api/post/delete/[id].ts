import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const session = await getServerSession(req, res, authOptions);

    if (!id) {
      return res.status(400).json({ error: "Missing or invalid id" });
    }

    try {
      const db = (await connectDB()).db("forum");
      let results = await db
        .collection("post")
        .findOne({ _id: new ObjectId(id) });

      if (results) {
        if (
          results.author === session?.user?.email ||
          session?.user?.role === "admin"
        ) {
          let result = await db
            .collection("post")
            .deleteOne({ _id: new ObjectId(id) });

          if (result.deletedCount === 1) {
            res.status(200).json({ message: "삭제 완료" });
          }
        } else {
          res.status(404).json({ error: "본인만 삭제할 수 있음" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
