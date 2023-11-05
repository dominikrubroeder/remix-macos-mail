import type { Mailbox } from "../../prisma/types";
import { useState } from "react";

interface MailboxProps {
  mailbox: Mailbox;
}

export default function Mailbox({ mailbox }: MailboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="grid gap-2">
      <h3 onClick={() => setIsOpen((prevState) => !prevState)}>
        {mailbox.title}
      </h3>
      {isOpen && (
        <ul className="grid gap-1 pl-4">
          <li className="flex cursor-pointer justify-between gap-2 rounded bg-gray-200 p-2">
            <span>Eingang</span>
            <span>{mailbox.inbox.length}</span>
          </li>
          <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
            <span>Markiert</span>
            <span>{mailbox.flagged.length}</span>
          </li>
          <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
            <span>Entwürfe</span>
          </li>
          <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
            <span>Gesendet</span>
            <span>{mailbox.send.length}</span>
          </li>
        </ul>
      )}
    </section>
  );
}
