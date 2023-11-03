import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";

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

  return mails.reverse();
}

export async function action({ request }: ActionFunctionArgs) {
  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);
  console.log("DATA", data);

  if (
    typeof data.receiver !== "string" ||
    typeof data.sender !== "string" ||
    typeof data.subject !== "string" ||
    typeof data.content !== "string"
  ) {
    throw new Error("Bad request");
  }

  return db.mail.create({
    data: {
      title: "This is the first custom Email!",
      sender: data.sender,
      subject: data.subject,
      receiver: data.receiver,
      date: new Date().toDateString(),
      content: data.content,
    },
  });
}

export default function Index() {
  let fetcher = useFetcher();
  const mails = useLoaderData<typeof loader>();
  const isLoading = fetcher.state === "loading";
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("dialog + button");
    const closeButton = document.querySelector("dialog button[title='Close']");
    const minimizeButton = document.querySelector(
      "dialog button[title='Minimize']",
    );

    if (!dialog || !showButton || !closeButton || !minimizeButton) return;

    showButton.addEventListener("click", () => dialog.showModal());
    minimizeButton.addEventListener("click", () => dialog.close());
    closeButton.addEventListener("click", () => dialog.close());
  }, []);

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
        <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 backdrop-blur">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold leading-none">Eingang</h2>
            <p className="leading-none">{mails.length} E-Mails</p>
          </div>
          <dialog className="h-1/2 w-1/2 rounded">
            <fetcher.Form
              method="post"
              className="grid h-full grid-rows-[auto_1fr_auto]"
            >
              <header className="p-4">
                <div className="group mb-4 flex gap-1">
                  <button
                    title="Close"
                    aria-label="close"
                    className="flex h-3 w-3 items-center justify-center rounded-full border bg-red-600"
                  >
                    <span className="invisible hidden text-xs text-gray-600 opacity-0 group-hover:visible group-hover:opacity-100">
                      x
                    </span>
                  </button>
                  <button
                    title="Minimize"
                    aria-label="minimize"
                    className="flex h-3 w-3 items-center justify-center rounded-full border bg-yellow-400"
                  >
                    <span className="invisible hidden text-xs text-gray-600 opacity-0 group-hover:visible group-hover:opacity-100">
                      -
                    </span>
                  </button>
                  <button
                    title="Scale"
                    aria-label="sacle"
                    className="flex h-3 w-3 items-center justify-center rounded-full border bg-green-600"
                  >
                    <span className="hidden">Scale</span>
                  </button>
                </div>

                <div className="grid gap-2">
                  <label
                    title="To"
                    className="flex gap-2 border-b pb-2 text-gray-400"
                  >
                    To:
                    <input
                      name="receiver"
                      type="email"
                      className="w-full text-gray-900 focus:outline-0"
                      required
                    />
                  </label>

                  <label
                    title="copy"
                    className="flex gap-2 border-b pb-2 text-gray-400"
                  >
                    Copy:
                    <input
                      name="copy"
                      type="email"
                      className="w-full text-gray-900 focus:outline-0"
                    />
                  </label>

                  <label
                    title="subject"
                    className="flex gap-2 border-b pb-2 text-gray-400"
                  >
                    Subject:
                    <input
                      name="subject"
                      type="text"
                      className="w-full text-gray-900 focus:outline-0"
                      required
                    />
                  </label>

                  <label
                    title="from"
                    className="flex gap-2 border-b pb-2 text-gray-400"
                  >
                    From:
                    <input
                      name="sender"
                      type="email"
                      className="w-full text-gray-900 focus:outline-0"
                      defaultValue="dominik.rubroeder@mediawave.de"
                      required
                    />
                  </label>
                </div>
              </header>

              <textarea
                name="content"
                className="w-full resize-none p-4 focus:outline-0"
                required
              />

              <footer className="flex justify-end p-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-blue-400"
                >
                  {isSubmitting ? "Add..." : "Send"}
                </button>
              </footer>
            </fetcher.Form>
          </dialog>
          <button>New Mail</button>
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
      <div className="overflow-hidden overflow-y-scroll">
        <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 px-8 backdrop-blur">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm">
              DR
            </div>
            <div>
              <h2 className="font-bold">{mails[0].sender}</h2>
              <h1 className="mb-0.5 text-sm">{mails[0].subject}</h1>
              <p className="flex gap-2 text-sm">
                <span>To:</span>
                <span className="text-gray-600">{mails[0].receiver}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            {mails[0].date}
          </div>
        </header>
        <div className="p-4">{mails[0].content}</div>
      </div>
    </main>
  );
}
