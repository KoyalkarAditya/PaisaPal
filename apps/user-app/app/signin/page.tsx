"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import z from "zod";
export default function () {
  const schema = z.object({
    phoneno: z.string().min(3).max(12),
    password: z.string().min(3).max(20),
  });
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [isError, setIsError] = useState(false);
  const handleSignIn = async () => {
    try {
      schema.parse({
        phoneno,
        password,
      });
      await signIn("credentials", {
        phone: phoneno,
        password,
        callbackUrl: "/",
      });
    } catch (e) {
      setIsError(true);
    }
  };
  const handleSignInasGuest = async () => {
    await signIn("credentials", {
      phone: "11111",
      password: "11111",
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-full flex font-sans items-center justify-center h-screen">
      <div className="rounded-2xl flex gap-3 flex-col p-8 bg-[#f2f2f2] ">
        <div className="flex gap-3 flex-col ">
          <div className="text-xl font-semibold">Phone Number</div>
          <input
            onChange={(e) => {
              setIsError(false);
              setPhoneno(e.target.value);
            }}
            type="text"
            className="px-10 py-2 rounded-xl"
            placeholder="Phone number"
          />
        </div>
        <div className="flex gap-3 flex-col ">
          <div className="text-xl font-semibold">Password</div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false);
            }}
            type="password"
            className="px-10 py-2 rounded-xl"
            placeholder="Password"
          />
        </div>
        {isError && (
          <div className="text-sm text-red-500 ">Invalid Credentials</div>
        )}
        <div className="flex justify-between  mt-5">
          <button
            onClick={handleSignIn}
            className=" text-black border border-blue-500  px-6 py-2 rounded-xl"
          >
            SignIn
          </button>
          <button
            onClick={handleSignInasGuest}
            className="bg-blue-500 px-6 text-white py-2 rounded-xl"
          >
            SignIn as guest
          </button>
        </div>
      </div>
    </div>
  );
}
