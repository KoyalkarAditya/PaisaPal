import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";

export default async function () {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
