import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: parseInt(req.body.user_identifier),
    amount: parseInt(req.body.amount),
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
    await db.$transaction(async (tx) => {
      await tx.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
          locked: {
            decrement: paymentInformation.amount,
          },
        },
      });
      await tx.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });

    res.json({
      message: "Captured",
    });
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
