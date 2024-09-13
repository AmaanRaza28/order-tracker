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
import { ArrowDownUp } from "lucide-react";

function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sortBy = searchParams.get("sortBy") || "createdAt";

  const handleSort = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", filter);
    params.set("page", "1");
    const url = `${pathname}/?${params.toString()}`;
    replace(url);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-xl focus-visible:ring-0">
          <ArrowDownUp className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-gray-200 mx-5 w-48 rounded-xl">
        <DropdownMenuLabel>Sort By:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
          <DropdownMenuRadioItem value="createdAt">
            Created At
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="id">Order Id</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Sort;
