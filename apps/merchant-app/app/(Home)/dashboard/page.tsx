import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { Transaction } from "../../components/Transaction";

export default async function () {
  const transactions = await getMerchantsTransactions();
  return (
    <div>
      <div>Transactions ...</div>
      <div>
        {transactions.map((tsx) => (
          <Transaction transaction={tsx}></Transaction>
        ))}
      </div>
    </div>
  );
}

const getMerchantsTransactions = async () => {
  const session = await getServerSession(authOptions);
  const merchantId = session?.user.id;
  const transactions = await db.ptoMerchantTransfers.findMany({
    where: {
      merchantId,
    },
  });
  return transactions.map((tsx) => tsx);
};
