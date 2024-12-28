import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  console.log("current user", session);
  return session?.user;
};
