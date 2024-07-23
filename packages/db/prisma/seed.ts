import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const a = await prisma.user.upsert({
    where: { number: "22222222" },
    update: {},
    create: {
      number: "22222222",
      password: "22222222",
      name: "Jack",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "100",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const b = await prisma.user.upsert({
    where: { number: "111111111" },
    update: {},
    create: {
      number: "111111111",
      password: "111111111",
      name: "Will",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 200000,
          token: "101",
          provider: "HDFC Bank",
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
