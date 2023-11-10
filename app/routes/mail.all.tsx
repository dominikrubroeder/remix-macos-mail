import { PrismaClient } from "@prisma/client";

export async function loader() {
  const db = new PrismaClient();
  const mails = await db.mail.findMany();

  return {
    mails: mails.reverse(),
    currentMail: mails.find((mail) => mail.isCurrentMail),
  };
}
