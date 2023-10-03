import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (
      req.body.name === "" ||
      req.body.password === "" ||
      req.body.email === ""
    ) {
      return res.status(500).json("빈칸");
    }

    try {
      const db = (await connectDB()).db("forum");

      const existingUserInCred = await db
        .collection("user_cred")
        .findOne({ email: req.body.email });
      const existingUserInUsers = await db
        .collection("users")
        .findOne({ email: req.body.email });

      if (existingUserInCred || existingUserInUsers) {
        return res.status(409).json({ error: "이미 사용 중인 이메일입니다." });
      }

      let hash = await bcrypt.hash(req.body.password, 10);

      const newUser = {
        ...req.body,
        password: hash,
        role: "member",
      };

      await db.collection("user_cred").insertOne(newUser);

      res.status(200).json("가입 성공");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 내부 오류입니다." });
    }
  }
}
