import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ params }: ActionFunctionArgs) {
  if (typeof params.mailId !== "string") {
    throw new Response("Not id found", { status: 404 });
  }

  // Get db connection
  let db = new PrismaClient();

  // Get mail with id from params
  let mails = await db.mail.findMany();
  const currentMail = mails.find((mail) => mail.id === +params.mailId);

  if (!currentMail) {
    throw new Response("No matching Mail found", { status: 404 });
  }

  // Updating single value entry in Mail database
  await db.currentMail.updateMany({
    data: {
      ...currentMail,
    },
  });

  // Redirect to root route when finished
  return redirect("/");
}
