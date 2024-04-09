import express from "express";
import db from "@repo/db/client";
const app = express();
import zod from "zod";
app.use(express.json());
const paymentSchema = zod.object({
  token: zod.string(),
  userId: zod.string(),
  amount: zod.string(),
});
app.post("/hdfcWebhook", async (req, res) => {
  const result = paymentSchema.safeParse(req.body);
  if (!result.success) {
    return res.json({
      message: "Invalid credentials",
    });
  }
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  const tsn = await db.onRampTransaction.findFirst({
    where: {
      token: paymentInformation.token,
    },
  });
  if (tsn?.status !== "Processing") {
    return res.json({
      message: "Request is already processed",
    });
  }

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
