import type { JSX } from "react";
import MailListItem from "~/components/MailListItem";

import type { Mail } from "../../prisma/types";

interface MailListProps {
  mails: Mail[];
  currentMail: Mail;
  setCurrentMail: (mail: Mail) => void;
  children: JSX.Element;
  isLoading: boolean;
}

export default function MailList({
  mails,
  currentMail,
  setCurrentMail,
  children,
  isLoading,
}: MailListProps) {
  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100">
      <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 backdrop-blur">
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold leading-none">Eingang</h2>
          <p className="leading-none">{mails.length} E-Mails</p>
        </div>
        {children}
        <button>New Mail</button>
      </header>
      {isLoading ? (
        <div>...</div>
      ) : (
        <ul className="grid gap-4 p-4">
          {mails.length > 0 &&
            mails.map((mail, index) => (
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
