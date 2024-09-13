import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { OrdersResponse, ErrorResponse } from "../types/api-types";

const app = express();
const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  res.send("Order Status Tracker API");
});

app.get(
  "/orders",
  async (req: Request, res: Response<OrdersResponse | ErrorResponse>) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const status = req.query.status as string | undefined;
      const search = req.query.search as string | undefined;
      const sortBy = req.query.sortBy as string | undefined;

      const offset = (page - 1) * 10;

      const where: any = {};

      if (status) where.status = status;
      if (search) {
        where.OR = [
          {
            customerName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            status: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }
      let orderBy: any = { createdAt: "desc" };
      if (sortBy) {
        orderBy = {
          [sortBy]: "desc",
        };
      }

      const [orders, totalOrders] = await Promise.all([
        prisma.order.findMany({
          where,
          take: 10,
          skip: offset,
          orderBy,
        }),
        prisma.order.count({ where }),
      ]);

      const pagesCount = Math.ceil(totalOrders / 10);

      const response: OrdersResponse = { orders, totalOrders, pagesCount };

      res.json(response);
    } catch (error) {
      console.error("Error Fetching Orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default app;
