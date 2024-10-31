"use client";
import { Button } from "./button";
import { usePathname } from "next/navigation";
interface AppBarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppBarProps) => {
  const path = usePathname();
  if (path == "/signin") {
    return null;
  }
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-xl  font-bold flex  text-purple-600 flex-col justify-center">
        PaisaPal
      </div>
      <div className="flex flex-col  justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
