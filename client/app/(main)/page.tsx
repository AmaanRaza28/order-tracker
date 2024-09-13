import { fetchOrders } from "../lib/data";
import { columns } from "./columns";
import { DataTable } from "../../components/data-table";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: number;
    status?: string;
    sortBy?: string;
  };
}) {
  const response = await fetchOrders(searchParams);
  return (
    <div className="flex flex-col items-center p-8 gap-4">
      <h1 className="text-4xl font-bold">Track Orders</h1>
      <div className="flex justify-between">
        <Search />
        <div className="flex space-x-2">
          <Sort />
          <Filter />
        </div>
      </div>
      <DataTable columns={columns} data={response.orders} />
      <Pagination totalPages={response.pagesCount} />
    </div>
  );
}
