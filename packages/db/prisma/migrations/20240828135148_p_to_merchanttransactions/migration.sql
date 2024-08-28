-- CreateTable
CREATE TABLE "ptoMerchantTransfers" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "merchantId" INTEGER NOT NULL,

    CONSTRAINT "ptoMerchantTransfers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ptoMerchantTransfers" ADD CONSTRAINT "ptoMerchantTransfers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ptoMerchantTransfers" ADD CONSTRAINT "ptoMerchantTransfers_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
