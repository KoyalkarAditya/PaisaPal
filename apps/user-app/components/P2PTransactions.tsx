import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export async function P2PTransactions({
  transactions,
}: {
  transactions: {
    fromUser: number;
    toUserId: number;
    amount: number;
    date: Date;
  }[];
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return <div>U are not logged in</div>;
  }
  return (
    <div>
      {transactions.map((transaction, index) => (
        <div key={index}>
          <Transaction transaction={transaction} userId={userId} />
        </div>
      ))}
    </div>
  );
}
function Transaction({
  userId,
  transaction,
}: {
  userId: number;
  transaction: {
    fromUser: number;
    toUserId: number;
    amount: number;
    date: Date;
  };
}) {
  if (userId == transaction.fromUser) {
    return (
      <div className="w-full mb-5 flex justify-between pl-12 pr-12 items-center">
        <div className="flex items-center">
          <SentIcon />
          <div className="ml-2">
            <div className="text-left font-semibold">PAID INR</div>
            <div>{transaction.date.toDateString()}</div>
          </div>
        </div>
        <div className="text-right font-bold">- {transaction.amount / 100}</div>
      </div>
    );
  }
  return (
    <div className="w-full mb-5 flex justify-between pl-12 pr-12 items-center">
      <div className="flex items-center">
        <ReceiveIcon />
        <div className="ml-2">
          <div className="text-left font-semibold">RECEIVED INR</div>
          <div>{transaction.date.toDateString()}</div>
        </div>
      </div>
      <div className="text-right font-bold">+ {transaction.amount / 100}</div>
    </div>
  );
}

function ReceiveIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFFFFF"
        className="w-9 h-9  bg-[#6a51a6] rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
        />
      </svg>
    </div>
  );
}

function SentIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFFFFF"
        className="w-9 h-9  bg-[#6a51a6] rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </div>
  );
}
