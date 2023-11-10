import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ request }: ActionFunctionArgs) {
  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  if (
    typeof data.receiver !== "string" ||
    typeof data.sender !== "string" ||
    typeof data.subject !== "string" ||
    typeof data.content !== "string"
  ) {
    throw new Error("Bad request");
  }

  await db.mail.create({
    data: {
      sender: data.sender || "dominik.rubroeder@icloud.com",
      subject: data.subject,
      receiver: data.receiver,
      date: new Date().toDateString(),
      content: data.content,
      mailbox: "iCloud",
      isDraft: false,
      flagged: false,
    },
  });

  return redirect("/");
}
