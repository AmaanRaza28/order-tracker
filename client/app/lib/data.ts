import { OrdersResponse } from "@/types/api-types";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchOrders({
  search = "",
  status = "",
  page = 1,
  sortBy = "createdAt",
}: {
  search?: string;
  status?: string;
  page?: number;
  sortBy?: string;
}): Promise<OrdersResponse> {
  noStore();
  try {
    const params = new URLSearchParams({
      ...(search && { search }),
      ...(status && { status }),
      page: page.toString(),
      sortBy,
    });

    const url = `http://localhost:4000/orders?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data: OrdersResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}
