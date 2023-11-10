import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import Sidebar from "~/components/Sidebar";
import MailView from "~/components/MailView";
import MailList from "~/components/MailList";
import NewMailDialog from "~/components/NewMailDialog";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix | macOS | Apple Mail" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let db = new PrismaClient();
  let mails = await db.mail.findMany();
  const currentMail = await db.currentMail.findMany();

  return { mails: mails.reverse(), currentMail: currentMail[0] };
}

export default function Index() {
  const { mails, currentMail } = useLoaderData<typeof loader>();

  return (
    <main className="grid h-screen grid-cols-[1fr_2fr_4fr]">
      <NewMailDialog />
      <Sidebar mails={mails} />
      <MailList mails={mails} currentMail={currentMail} />
      <MailView currentMail={currentMail} />
    </main>
  );
}
