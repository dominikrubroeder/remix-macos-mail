import { PrismaClient } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader() {
  let db = new PrismaClient();
  let currentMail = await db.currentMail.findMany();
  return currentMail[0];
}

export async function action({ request }: ActionFunctionArgs) {
  // Safe guard return when mailId was not found
  /** if (typeof params.mailId !== "string") {
    throw new Response("Not found", { status: 404 });
  } */

  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  // Updating single value entry in Mail database
  await db.currentMail.updateMany({
    data: {
      ...data,
    },
  });

  // Redirect to root route when finished
  return redirect("/");
}
