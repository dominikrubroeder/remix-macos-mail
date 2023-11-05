import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

/**
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
 */

export default function NewMailDialog() {
  let fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button[title='Close']");
    const minimizeButton = document.querySelector(
      "dialog button[title='Minimize']",
    );

    if (!dialog || !closeButton || !minimizeButton) return;

    minimizeButton.addEventListener("click", () => dialog.close());
    closeButton.addEventListener("click", () => dialog.close());
  }, []);

  return (
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
  );
}
