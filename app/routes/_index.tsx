import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import Sidebar from "~/components/Sidebar";
import MailView from "~/components/MailView";
import MailPreviewList from "~/components/MailPreviewList";
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

  return {
    mails: mails.reverse(),
    currentMail: mails.find((mail) => mail.isCurrentMail),
  };
}

export default function Index() {
  const { mails, currentMail } = useLoaderData<typeof loader>();

  return (
    <main className="grid h-screen grid-cols-[1fr_2fr_4fr]">
      <NewMailDialog />
      <Sidebar mails={mails} />
      <MailPreviewList mails={mails} />
      <MailView mail={currentMail} />
    </main>
  );
}
