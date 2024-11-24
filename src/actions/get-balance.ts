"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const getBalance = async () => {
  try {
    const session = await auth();
    const allTransactions = await prisma.transaction.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    const totalIncome = allTransactions
      .filter((group) => group.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = allTransactions
      .filter((group) => group.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const remainingIncome = totalIncome - totalExpense;
    return { remainingIncome, totalIncome, totalExpense };
  } catch (error) {
    console.log(error);
    return { error: "cannot get balance" };
  }
};
