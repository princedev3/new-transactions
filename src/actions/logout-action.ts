"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const logout = async () => {
  //some server stuff
  await signOut();
  redirect("/auth/login");
};
