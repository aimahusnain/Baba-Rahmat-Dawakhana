"use client";

import profilePicPlaceholder from "@/src/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.image || profilePicPlaceholder}
                alt="Profile picture"
                width={40}
                height={40}
                className="w-10 border-white border-2 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-[16px]">
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div></div>
        )}
      <ul tabIndex={0}>
        <li>
          {user ? (
            <div></div>
          ) : (
            <Button
              className="relative bg-gradient-to-l border-2 border-white from-pink-500 to-purple-500"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
}
