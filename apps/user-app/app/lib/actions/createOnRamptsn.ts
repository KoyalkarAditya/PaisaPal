"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const token = Math.random().toString();
  if (!userId) {
    return {
      message: "user not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      token: token,
      provider,
    },
  });
  await prisma.balance.update({
    where: {
      userId: Number(userId),
    },
    data: {
      locked: {
        increment: amount,
      },
    },
  });
  console.log("locked ");
  return {
    message: "OnRamp Transaction added",
  };
}
