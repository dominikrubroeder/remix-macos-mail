import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ params }: ActionFunctionArgs) {
  if (typeof params.mailId !== "string") {
    throw new Response("Not id found", { status: 404 });
  }

  let db = new PrismaClient();

  // Updating single value entry in Mail database
  await db.mail.updateMany({
    data: {
      isCurrentMail: false,
    },
  });

  await db.mail.update({
    where: {
      id: +params.mailId,
    },
    data: {
      isCurrentMail: true,
    },
  });

  // Redirect to root route when finished
  return redirect("/");
}
