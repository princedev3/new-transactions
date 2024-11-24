"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (id: string, userId: string) => {
  try {
    await prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });
    revalidatePath("/");
    return { success: " transaction deleted successfully" };
  } catch (error) {
    return { error: "can not delete transaction" };
  }
};
