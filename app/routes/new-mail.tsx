import LabelInputGroup, {
  formInputGroupsData,
} from "~/components/form/LabelInputGroup";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

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

  await db.mail.create({
    data: {
      sender: data.sender || "dominik.rubroeder@icloud.com",
      subject: data.subject,
      receiver: data.receiver,
      date: new Date().toDateString(),
      content: data.content,
      mailbox: "iCloud",
      isDraft: false,
      flagged: false,
    },
  });

  return redirect("/");
}

export default function NewMailPage() {
  let fetcher = useFetcher();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.state === "idle" && formRef.current) formRef.current.reset();
  }, [fetcher.state]);

  return (
    <dialog ref={dialogRef} className="h-1/2 w-1/2 rounded" open={true}>
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
                onClick={() => dialogRef.current?.close()}
              >
                <span className="invisible hidden text-xs text-gray-600 opacity-0 group-hover:visible group-hover:opacity-100">
                  x
                </span>
              </button>
              <button
                title="Minimize"
                aria-label="minimize"
                className="flex h-3 w-3 items-center justify-center rounded-full border bg-yellow-400"
                onClick={() => dialogRef.current?.close()}
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
              {formInputGroupsData.map((formInputGroup) => (
                <LabelInputGroup
                  key={formInputGroup.labelTitle}
                  labelTitle={formInputGroup.labelTitle}
                  inputName={formInputGroup.inputName}
                  inputType={formInputGroup.inputType}
                  required={formInputGroup.required}
                  defaultValue={formInputGroup.defaultValue}
                />
              ))}
            </div>
          </header>

          <textarea
            name="content"
            className="w-full resize-none border-none p-4 focus:border-none focus:outline-0 active:border-none"
            required
          />

          <footer className="flex justify-end p-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-blue-400"
              onClick={() => {
                // dialogRef.current?.close();
              }}
            >
              {isSubmitting ? "Add..." : "Send"}
            </button>
          </footer>
        </fieldset>
      </fetcher.Form>
    </dialog>
  );
}
