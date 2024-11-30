"use server";
import prisma from "@/prisma/prisma";

export const findHistory = async (id: string) => {
  try {
    const history = await prisma.transaction.findMany({
      where: {
        userId: id,
      },
    });
    return { history, error: "" };
  } catch (err) {
    return { history: [], error: "Failed to fetch transaction history" };
  }
};
