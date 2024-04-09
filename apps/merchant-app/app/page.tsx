"use client";
import { useBalance } from "@repo/store/useBalance";
export default function Page(): JSX.Element {
  const balance = useBalance();
  return <div></div>;
}
