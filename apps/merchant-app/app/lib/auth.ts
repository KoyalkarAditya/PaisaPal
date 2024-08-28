import db from "@repo/db/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const { phone, name, email, password } = credentials;
        console.log(credentials);
        const merchant = await db.merchant.findFirst({
          where: {
            email,
            phoneno: phone,
          },
        });
        if (merchant) {
          const passwordValidation = await bcrypt.compare(
            password,
            merchant.password
          );
          if (passwordValidation) {
            return {
              id: merchant.id.toString(),
              name: merchant.name,
              email: merchant.email,
              number: merchant.phoneno,
            };
          }
          return null;
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newMerchant = await db.$transaction(async (txn) => {
          const merchant = await txn.merchant.create({
            data: {
              email,
              phoneno: phone,
              name,
              password: hashedPassword,
            },
          });
          await txn.merchantBalance.create({
            data: {
              merchantId: merchant.id,
              amount: 0,
              locked: 0,
            },
          });
          return merchant;
        });

        return {
          id: newMerchant.id,
          name: newMerchant.name,
          email: newMerchant.email,
          number: newMerchant.phoneno,
        };
      },
    }),
  ],

  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
