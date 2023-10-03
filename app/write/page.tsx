import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인 후 작성 가능합니다.</div>;
  }

  return (
    <div>
      <h4>글쓰기</h4>
      <form action="/api/post/new" method="POST">
        <input type="text" className="border border-black" name="title" />
        <input type="text" className="border border-black" name="content" />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}
