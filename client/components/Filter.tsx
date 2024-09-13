"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FilterIcon } from "lucide-react";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const status = searchParams.get("status") || "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", filter);
    if (filter === "all") {
      params.delete("status");
    }
    params.set("page", "1");
    const url = `${pathname}/?${params.toString()}`;
    replace(url);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-xl focus-visible:ring-0">
          <FilterIcon className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-gray-200 mx-5 w-48 rounded-xl">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={handleFilter}>
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="processing">
            Processing
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="shipped">Shipped</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="delivered">
            Delivered
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cancelled">
            Cancelled
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Filter;
