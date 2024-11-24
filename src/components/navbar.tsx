"use client";
import Image from "next/image";
import React from "react";
import { useSessionStore } from "./user-session-store";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout-action";
import Link from "next/link";

const Navbar = () => {
  const user = useSessionStore((state) => state.session?.user);
  const signOut = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <div className="h-20 grid px-2 md:px-0 max-w-3xl mx-auto w-full grid-cols-2 items-center ">
      <Link href={"/"} className="cursor-pointer">
        <Image src={"/logo.svg"} width={40} height={40} alt="" />
      </Link>
      <div className="justify-self-end place-items-end">
        {user ? (
          <>
            <Button
              onClick={signOut}
              className="bg-blue-950 cursor-pointer hover:bg-blue-800 font-semibold capitalize"
            >
              sign out
            </Button>
          </>
        ) : (
          <div className="">
            <Button className="bg-blue-950 cursor-pointer hover:bg-blue-800 font-semibold capitalize">
              <Link href={"/auth/login"}>sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
