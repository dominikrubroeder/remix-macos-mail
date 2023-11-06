import MailListItem from "~/components/MailListItem";

import type { Mail } from "../../prisma/types";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface MailListProps {
  mails: Mail[];
  currentMail: Mail;
  setCurrentMail: (mail: Mail) => void;
  isLoading: boolean;
}

export default function MailList({
  mails,
  currentMail,
  setCurrentMail,
  isLoading,
}: MailListProps) {
  const inboxMails = mails.filter(
    (mail) => mail.sender !== "dominik.rubroeder@icloud.com",
  );

  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100">
      <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 backdrop-blur">
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold leading-none">Inbox</h2>
          <p className="leading-none">
            {inboxMails.length}{" "}
            {inboxMails.length === 0 || mails.length > 1 ? "E-Mails" : "E-Mail"}
          </p>
        </div>
        <button className="rounded bg-transparent p-2 hover:bg-gray-200">
          <FunnelIcon className="h-5 w-5 font-bold text-gray-400" />
        </button>
      </header>
      {isLoading ? (
        <div>...</div>
      ) : (
        <ul className="grid gap-4 p-4">
          {inboxMails.length > 0 &&
            inboxMails.map((mail) => (
              <li
                key={mail.id}
                className={`group cursor-pointer rounded-md border-b p-4 hover:bg-blue-600 hover:text-white ${
                  mail.id === currentMail.id
                    ? "bg-blue-600 text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setCurrentMail(mail)}
              >
                <MailListItem mail={mail} currentMail={currentMail} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
