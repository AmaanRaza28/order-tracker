"use client";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const createPageURL = (newPage: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    const url = `${pathname}/?${params.toString()}`;
    return url;
  };
  const allPages = generatePagination(page, totalPages);

  return (
    <div className="flex items-center">
      <PaginationArrow
        direction="left"
        isDisabled={page <= 1}
        href={createPageURL(page - 1)}
      />
      {allPages.map((pageNumber, index) => {
        let position: "first" | "last" | "single" | "middle" | undefined;

        if (index === 0) position = "first";
        if (index === allPages.length - 1) position = "last";
        if (allPages.length === 1) position = "single";
        if (pageNumber === "...") position = "middle";

        return (
          <PaginationNumber
            key={pageNumber}
            href={createPageURL(pageNumber)}
            page={pageNumber}
            position={position}
            isActive={pageNumber === page}
          />
        );
      })}
      <PaginationArrow
        direction="right"
        isDisabled={page === totalPages}
        href={createPageURL(page + 1)}
      />
    </div>
  );
}

interface PaginationArrowProps {
  direction: "left" | "right";
  isDisabled: boolean;
  href: string;
}

function PaginationArrow({
  direction,
  isDisabled,
  href,
}: PaginationArrowProps) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-xl",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  );
}

interface PaginationNumberProps {
  page: number | string;
  href: string;
  isActive: boolean;
  position: "first" | "last" | "middle" | "single" | undefined;
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: PaginationNumberProps) {
  console.log(page, href, isActive, position);
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-xl  mx-1",
    {
      "bg-black  text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );
  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
