import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name: string | null;
    email: string | null;
    image?: string | null | undefined;
    role?: string | null | undefined;
  }

  interface Session {
    user: User;
  }
}
