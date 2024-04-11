import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2PTransactions } from "../../../components/P2PTransactions";

export default async function () {
  const transactions = await getP2PTransactions();
  return (
    <div className="w-screen">
      <div className=" border-b text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        <div className=" pb-3"> Recent Transactions</div>
      </div>
      <P2PTransactions transactions={transactions} />
    </div>
  );
}

interface Transaction {
  fromUser: number;
  toUserId: number;
  amount: number;
  date: Date;
}

async function getP2PTransactions(): Promise<Transaction[]> {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: userId,
        },
        {
          toUserId: userId,
        },
      ],
    },
  });
  return transactions.map((tsx: any) => ({
    fromUser: tsx.fromUserId,
    toUserId: tsx.toUserId,
    amount: tsx.amount,
    date: tsx.timestamp,
  }));
}
