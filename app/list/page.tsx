import ListItem from "@/components/ListItem";
import { connectDB } from "@/utils/database";

interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB()).db("forum");
  let results = await db.collection("post").find().toArray();

  const formattedResults: IPost[] = results.map((result) => ({
    title: result.title,
    content: result.content,
    _id: result._id.toString(),
    author: result.author,
  }));

  return (
    <div className="list-bg">
      <ListItem results={formattedResults} />
    </div>
  );
}
