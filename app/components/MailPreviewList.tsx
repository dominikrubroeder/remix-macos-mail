import MailPreview from "~/components/MailPreview";

import type { Mail } from "@prisma/client";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";

export default function MailPreviewList({ mails }: { mails: Mail[] }) {
  const fetcher = useFetcher({ key: "mail.current" });
  const inboxMails = mails.filter(
    (mail) => mail.sender !== "dominik.rubroeder@icloud.com",
  );

  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100">
      <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 backdrop-blur">
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold leading-none">Inbox</h2>
          <p className="leading-none">
            {inboxMails.length}&nbsp;
            {inboxMails.length === 0 || mails.length > 1 ? "E-Mails" : "E-Mail"}
          </p>
        </div>
        <button className="rounded bg-transparent p-2 hover:bg-gray-200">
          <FunnelIcon className="h-5 w-5 font-bold text-gray-400" />
        </button>
      </header>
      <ul className="grid gap-4 p-4">
        {inboxMails.length > 0 &&
          inboxMails.map((mail) => (
            <li
              key={mail.id}
              className={`group cursor-pointer rounded-md border-b p-4 hover:bg-blue-600 hover:text-white ${
                mail.isCurrentMail ? "bg-blue-600 text-white" : "bg-transparent"
              }`}
            >
              <fetcher.Form
                method="post"
                action={`/mail/edit/${mail.id}/isCurrentMail,read`}
              >
                <button className="text-left" type="submit">
                  <MailPreview mail={mail} />
                </button>
              </fetcher.Form>
            </li>
          ))}
      </ul>
    </div>
  );
}
