import type { MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Sidebar from "~/components/Sidebar";
import MailView from "~/components/MailView";
import MailList from "~/components/MailList";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix | macOS | Apple Mail" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let db = new PrismaClient();
  let mails = await db.mail.findMany();

  return mails.reverse();
}

export default function Index() {
  let fetcher = useFetcher();
  const mails = useLoaderData<typeof loader>();
  const [currentMail, setCurrentMail] = useState(
    mails.filter((mail) => mail.sender !== "dominik.rubroeder@icloud.com")[0],
  );
  const isLoading = fetcher.state === "loading";

  return (
    <main className="grid h-screen grid-cols-[1fr_2fr_4fr]">
      <Sidebar mails={mails} />
      <MailList
        mails={mails}
        currentMail={currentMail}
        setCurrentMail={setCurrentMail}
        isLoading={isLoading}
      />
      <MailView currentMail={currentMail} />
    </main>
  );
}
