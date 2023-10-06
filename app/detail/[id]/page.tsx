import Comments from "@/components/Comments";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

interface IParams {
  params: Params;
}

export default async function Detail({ params }: IParams) {
  const db = (await connectDB()).db("forum");
  let results = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  if (results === null) {
    return notFound();
  }

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{results.title}</h4>
      <p>{results.content}</p>
      <Comments parent={results._id.toString()} />
    </div>
  );
}
