export default function Write() {
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
