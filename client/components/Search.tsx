"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    const url = `${pathname}/?${params.toString()}`;
    replace(url);
  }, 200);

  return (
    <div className="flex items-center border-[1px] rounded-full px-4 mr-3">
      <SearchIcon className="w-5 h-5" />
      <Input
        className=" focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full border-none md:w-80"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder="Search"
      />
    </div>
  );
}

export default Search;
