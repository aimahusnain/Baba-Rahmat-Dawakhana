import { authOptions } from "@/src/lib/auth";
import { getCart } from "@/src/lib/db/cart";
import { Search } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoMdMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import Searchbar from "./SearchBar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { AlignJustify } from 'lucide-react';

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="h-fit items-center text-black bg-pink-500 py-2 px-7 sm:px-12 shadow-md">
      <div className="mx-auto flex justify-between items-center gap-2">
        <div className="flex sm:hidden">
          <Sheet>
            <SheetTrigger><AlignJustify stroke="white" /></SheetTrigger>
            <SheetContent side="left">
              <ul className="flex flex-col gap-6 font-sans font-semibold text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-900 transition-all"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-900 transition-all"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-900 transition-all"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        <ul className="sm:flex hidden gap-6 font-sans font-semibold text-white">
          <li>
            <Link href="#" className="transition-all">
              Blog
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-all">
              Contact
            </Link>
          </li>
          <li>
            <Link href="#" className="transition-all">
              About
            </Link>
          </li>
        </ul>

        {/* logo */}
        <Link href="/" className="flex mt-2 items-center text-3xl sm:text-4xl">
          <Image width={320} height={60} loading="eager" src="/Logo.svg" alt="Logo" />
        </Link>

        <div className="flex gap-4">

          <Searchbar searchProducts={searchProducts} />

          {/* actions */}
          <div className="hidden sm:flex gap-2 items-center">
            <ShoppingCartButton cart={cart} />
            <UserMenuButton session={session} />
          </div>

          {/* responsive dropdown menu */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex p-2 border border-white outline-none rounded-full">
                <IoMdMore fill="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex gap-2">
                <DropdownMenuItem>
                  <UserMenuButton session={session} />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCartButton cart={cart} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
  <div className="flex-1">
    <Link href="/" className="btn-ghost btn text-xl normal-case">
      <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
      Flowmazon
    </Link>
  </div>
  <div className="flex-none gap-2">
    <form action={searchProducts}>
      <div className="form-control">
        <input
          name="searchQuery"
          placeholder="Search"
          className="input-bordered input w-full min-w-[100px]"
        />
      </div>
    </form>
    <ShoppingCartButton cart={cart} />
    <UserMenuButton session={session} />
  </div>
// </div> */
}
