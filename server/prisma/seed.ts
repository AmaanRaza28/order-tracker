import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Amaan",
  "Kareem",
  "Nina",
  "Omar",
  "Pamela",
];

const lastNames = [
  "Smith",
  "Doe",
  "Johnson",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
];

function getRandomUserName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

function getRandomStatus() {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function main() {
  const orders = Array.from({ length: 100 }, (_, i) => ({
    customerName: getRandomUserName(),
    status: getRandomStatus(),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
  }));

  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log("Seeded 50 orders successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
