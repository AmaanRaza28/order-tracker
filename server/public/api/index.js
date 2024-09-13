"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Order Status Tracker API");
}));
app.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const status = req.query.status;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const offset = (page - 1) * 10;
        const where = {};
        if (status)
            where.status = status;
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
        let orderBy = { createdAt: "desc" };
        if (sortBy) {
            orderBy = {
                [sortBy]: "desc",
            };
        }
        const [orders, totalOrders] = yield Promise.all([
            prisma.order.findMany({
                where,
                take: 10,
                skip: offset,
                orderBy,
            }),
            prisma.order.count({ where }),
        ]);
        const pagesCount = Math.ceil(totalOrders / 10);
        const response = { orders, totalOrders, pagesCount };
        res.json(response);
    }
    catch (error) {
        console.error("Error Fetching Orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app
    .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
    .on("error", (err) => {
    console.error(err);
});
