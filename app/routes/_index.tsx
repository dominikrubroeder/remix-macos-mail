import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
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

export async function action({ request }: ActionFunctionArgs) {
  let db = new PrismaClient();

  let formData = await request.formData();
  let data = Object.fromEntries(formData);

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
  const [currentMail, setCurrentMail] = useState(mails[0]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isLoading = fetcher.state === "loading";
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    const showButton = document.querySelector("dialog + button");
    const closeButton = document.querySelector("dialog button[title='Close']");
    const minimizeButton = document.querySelector(
      "dialog button[title='Minimize']",
    );

    if (!dialogRef.current || !showButton || !closeButton || !minimizeButton)
      return;

    showButton.addEventListener("click", () => dialogRef.current?.showModal());
    minimizeButton.addEventListener("click", () => dialogRef.current?.close());
    closeButton.addEventListener("click", () => dialogRef.current?.close());
  }, [dialogRef]);

  useEffect(() => {
    if (fetcher.state === "idle" && formRef.current) formRef.current.reset();
  }, [fetcher.state]);

  return (
    <main className="grid h-screen grid-cols-[1fr_2fr_4fr]">
      <Sidebar />
      <MailList
        mails={mails}
        currentMail={currentMail}
        setCurrentMail={setCurrentMail}
        isLoading={isLoading}
      >
        <dialog ref={dialogRef} className="h-1/2 w-1/2 rounded">
          <fetcher.Form method="post" ref={formRef} className="h-full">
            <fieldset
              className="grid h-full grid-rows-[auto_1fr_auto]"
              disabled={isSubmitting}
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
                  onClick={() => {
                    dialogRef.current?.close();
                  }}
                >
                  {isSubmitting ? "Add..." : "Send"}
                </button>
              </footer>
            </fieldset>
          </fetcher.Form>
        </dialog>
      </MailList>
      <MailView currentMail={currentMail} />
    </main>
  );
}
