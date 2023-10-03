import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

interface Params {
  id: string;
}

interface IParams {
  params: Params;
}

export default async function Edit({ params }: IParams) {
  const session = await getServerSession(authOptions);

  const db = (await connectDB()).db("forum");
  let results = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  if (!results) {
    throw new Error();
  }

  if (results) {
    if (
      session?.user.email !== results.author &&
      session?.user.role !== "admin"
    ) {
      return <div>본인만 수정 가능</div>;
    }
  }

  return (
    <div>
      <h4>글수정</h4>
      <form action="/api/post/edit" method="POST">
        <input
          type="text"
          className="border border-black"
          name="title"
          defaultValue={results.title}
        />
        <input
          type="text"
          className="border border-black"
          name="content"
          defaultValue={results.content}
        />
        <input
          type="text"
          style={{ display: "none" }}
          className="border border-black"
          name="_id"
          defaultValue={results._id.toString()}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
