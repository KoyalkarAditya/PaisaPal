export function Transaction({
  transaction,
}: {
  transaction: {
    userId: number;
    merchantId: number;
    amount: number;
    timestamp: Date;
  };
}) {
  return (
    <div className="w-full mb-5 flex justify-between pl-12 pr-12 items-center">
      <div className="flex items-center">
        <ReceiveIcon />
        <div className="ml-2">
          <div className="text-left font-semibold">RECEIVED INR</div>
          <div>{transaction.timestamp.toDateString()}</div>
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
