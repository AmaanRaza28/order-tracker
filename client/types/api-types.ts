export interface Order {
  id: number;
  customerName: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}

export interface OrdersResponse {
  orders: Order[];
  totalOrders: number;
  pagesCount: number;
}

export interface ErrorResponse {
  error: string;
}
