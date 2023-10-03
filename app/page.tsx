import { connectDB } from "@/utils/database";

// 사용자가 페이지 방문 시 60초 동안 페이지가 캐싱됨
// export const revalidate = 60;

export default async function Home() {
  // {cache: 'force-cache'}는 생략해도 GET 요청 결과를 캐싱함
  // await fetch('/URL', {cache: 'force-cache'})

  // 매번 서버로 요청해서 새 거를 가져옴
  // await fetch('/URL', {cache: 'no-store'})

  // 60초마다 캐싱된 데이터를 갱신해줌
  // await fetch('/URL', {next: {revalidate: 60}})

  // axios를 사용할 경우, axios는 자체적으로 캐싱 기능이 내장되어있지 않기에,
  // 별도의 캐싱 라이브러리를 찾고 설정해야함

  // const db = (await connectDB()).db("forum");
  // let results = await db.collection("post").find().toArray();

  return <div>HI</div>;
}
