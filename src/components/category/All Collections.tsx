'use client'

import ProductCardForShowing from "@/src/components/ProductCardForShowing";
import React, { useState } from "react";
import Filters from "./Filters";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

interface Product {
  id: string;
  price: number;
  imageUrls: string[];
  name: string;
  salesCount: number; // Assuming this property represents the number of sales
}

const Asc = ({ product }: any) => {
  const [sortedList, setSortedList] = useState<Product[]>([...product]);
  const [originalList, setOriginalList] = useState<Product[]>([...product]);

  const handleSort = (order: "asc" | "desc" | "bestSelling") => {
    if (order === "bestSelling") {
      const sorted = [...product].sort((a, b) =>
        a.price - b.price // Sort by sales count
      );
      setSortedList(sorted);
    } else {
      const sorted = [...product].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
      setSortedList(sorted);
    }
  };

  const handleResetSorting = () => {
    setSortedList([...originalList]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <div className="sticky items-start md:flex hidden top-8">
            <Filters handleResetSorting={handleResetSorting} handleSort={handleSort} />
          </div>
          <div className="md:hidden block">
            <Sheet>
              <SheetTrigger>
                <Button variant="outline">Filter</Button>
              </SheetTrigger>
              <SheetContent className="flex items-start">
                <Filters handleResetSorting={handleResetSorting} handleSort={handleSort} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="col-span-3 grid gap-8 grid-cols-2 lg:grid-cols-3">
          {sortedList.map((product: Product) => (
            <ProductCardForShowing key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Asc;
