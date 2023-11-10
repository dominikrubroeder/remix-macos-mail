import { PrismaClient } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function action({ params }: ActionFunctionArgs) {
  if (typeof params.mailId != "string") {
    throw new Response("Not found", { status: 404 });
  }

  let db = new PrismaClient();

  await db.mail.delete({
    where: {
      id: +params.mailId,
    },
  });

  return redirect("/");
}
