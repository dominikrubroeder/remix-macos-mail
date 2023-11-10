import { PrismaClient } from "@prisma/client";

export async function loader() {
  const db = new PrismaClient();
  const mails = await db.mail.findMany();

  return mails.reverse();
}
