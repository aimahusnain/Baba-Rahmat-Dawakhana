"use client";

import { ShoppingCart } from "@/src/lib/db/cart";
import { formatPrice } from "@/src/lib/format";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { ShoppingBag } from 'lucide-react';

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  return (
    <div className="outline-none">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex">
          <ShoppingBag size={20} className="text-black sm:text-white" />
          <Badge className="relative bottom-[9px] bg-pink-500 hover:bg-pink-500 text-white right-[5px] p-0 px-1">
            {cart?.size || 0}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>Products {cart?.size || 0}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {" "}
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link
              href="/cart"
              className="btn-primary btn-block btn"
              onClick={closeDropdown}
            >
              View cart
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
