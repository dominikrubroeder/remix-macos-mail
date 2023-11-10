import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export async function action({ request, params }: ActionFunctionArgs) {
  const mailId = params.mailId;
  const property = params.property;

  if (!mailId || !property) {
    throw new Response("Not found", { status: 404 });
  }

  const db = new PrismaClient();
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  switch (property) {
    case "isCurrentMail":
      await db.mail.updateMany({
        data: {
          isCurrentMail: false,
        },
      });

      await db.mail.update({
        where: {
          id: +mailId,
        },
        data: {
          isCurrentMail: true,
        },
      });
      break;
    case "flag":
      await db.mail.update({
        where: {
          id: +mailId,
        },
        data: {
          flagged: data.flagged !== "on",
        },
      });
      break;
    default:
      return redirect("/");
  }

  return redirect("/");
}
