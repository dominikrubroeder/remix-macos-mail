import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";

export async function loader() {
  /** @TODO Load all new entries from mail db; use Prototype for now */
  /** const db = new PrismaClient();
  const mails = await db.mail.findMany();

  return {
    mails: mails.reverse(),
    currentMail: mails.find((mail) => mail.isCurrentMail),
  }; */

  const db = new PrismaClient();

  await db.mail.create({
    data: {
      sender: "dominik.rubroeder@mediawave.de",
      subject: "New Mail :-)",
      receiver: "dominik.rubroeder@icloud.com",
      date: new Date().toDateString(),
      content: "Mail content",
      mailbox: "iCloud",
      isDraft: false,
      flagged: false,
      isCurrentMail: false,
    },
  });

  return redirect("/");
}
