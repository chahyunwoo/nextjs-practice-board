"use client";

import Error from "next/error";

// error 페이지는 무조건 use-client로 작성

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h4>에러 발생함</h4>
      <button onClick={() => reset()}>리셋하기</button>
    </div>
  );
}
