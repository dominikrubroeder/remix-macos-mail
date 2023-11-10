import { PrismaClient } from "@prisma/client";

export async function loader() {
  let db = new PrismaClient();
  let currentMail = await db.currentMail.findMany();
  return currentMail[0];
}
