import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix | macOS | Apple Mail" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Box = "Favoriten" | "Intelligente Postfächer" | "iCloud";

const boxes: Box[] = ["Favoriten", "Intelligente Postfächer", "iCloud"];

export async function loader() {
  let db = new PrismaClient();
  let mails = await db.mail.findMany();

  return mails;
}

export async function action({ request }: ActionFunctionArgs) {
  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);
  console.log(data);

  return db.mail.create({
    data: {
      title: "This is the first Email",
      sender: "dominik.rubroeder@icloud.com",
      subject: "Building the base UI",
      receiver: "dominik.rubroeder@mediawave.de",
      date: new Date().toDateString(),
      content: "This is the mail content!",
    },
  });
}

export default function Index() {
  let fetcher = useFetcher();
  const mails = useLoaderData<typeof loader>();
  const isLoading = fetcher.state === "loading";
  const isSubmitting = fetcher.state === "submitting";

  return (
    <main className="grid h-screen grid-cols-[1fr_2fr_4fr]">
      <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100 p-4">
        <ul className="grid gap-8">
          {boxes.map((box) => (
            <li key={box}>{box}</li>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100">
        <header className="sticky top-0 flex items-start justify-between bg-gray-100 p-4">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold leading-none">Eingang</h2>
            <p className="leading-none">{mails.length} E-Mails</p>
          </div>
          <fetcher.Form method="post">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-blue-400"
            >
              {isSubmitting ? "Add..." : "New Mail"}
            </button>
          </fetcher.Form>
        </header>
        {isLoading ? (
          <div>...</div>
        ) : (
          <ul className="grid gap-4 p-4">
            {mails.map((mail, index) => (
              <li
                key={mail.id}
                className={`rounded-md border-b p-4 ${
                  index === 0 ? "bg-blue-600 text-white" : "bg-transparent"
                }`}
              >
                <header>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold">{mail.sender}</h2>
                    <span
                      className={`text-xs ${
                        index === 0 ? "text-white/40" : "text-gray-400"
                      }`}
                    >
                      {mail.date}
                    </span>
                  </div>
                  <h3>{mail.subject}</h3>
                </header>
                <p className={index === 0 ? "text-white/40" : "text-gray-400"}>
                  {mail.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="overflow-hidden overflow-y-scroll p-4">
        {mails[0].content}
      </div>
    </main>
  );
}
