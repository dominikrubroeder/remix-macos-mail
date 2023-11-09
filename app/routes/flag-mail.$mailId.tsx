import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ request, params }: ActionFunctionArgs) {
  if (typeof params.mailId !== "string") {
    throw new Response("Not found", { status: 404 });
  }

  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  await db.mail.update({
    where: {
      id: +params.mailId,
    },
    data: {
      flagged: data.flagged !== "on",
    },
  });

  return redirect("/");
}
