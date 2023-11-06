import type { Mail } from "../../prisma/types";
import {
  EnvelopeIcon,
  FlagIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

interface MailViewProps {
  currentMail: Mail;
}

export default function MailView({ currentMail }: MailViewProps) {
  if (!currentMail)
    return (
      <div className="flex min-h-screen items-center justify-center p-4 text-gray-400">
        No Mails :)
      </div>
    );

  return (
    <div className="overflow-hidden overflow-y-scroll">
      <header className="sticky top-0 grid gap-4 bg-gray-100/90 p-4 px-8 backdrop-blur">
        <div className="flex flex-wrap gap-4">
          <button className="rounded bg-transparent p-2 hover:bg-gray-200">
            <EnvelopeIcon className="h-5 w-5 font-bold text-gray-400" />
          </button>
          <div className="flex flex-wrap">
            <Link to="/new-mail">
              <button className="rounded bg-transparent p-2 hover:bg-gray-200">
                <PencilSquareIcon className="h-5 w-5 font-bold text-gray-400" />
              </button>
            </Link>
            <button className="rounded bg-transparent p-2 hover:bg-gray-200">
              <FlagIcon className="h-5 w-5 font-bold text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm">
              DR
            </div>
            <div>
              <h2 className="font-bold">{currentMail.sender}</h2>
              <h1 className="mb-0.5 text-sm">{currentMail.subject}</h1>
              <p className="flex gap-2 text-sm">
                <span>To:</span>
                <span className="text-gray-600">{currentMail.receiver}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            {currentMail.date}
          </div>
        </div>
      </header>
      <div className="p-4">{currentMail.content}</div>
    </div>
  );
}
