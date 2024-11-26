"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const logout = async () => {
  try {
    await signOut();
    redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};
