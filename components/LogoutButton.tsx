"use client";

import { signOut } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
