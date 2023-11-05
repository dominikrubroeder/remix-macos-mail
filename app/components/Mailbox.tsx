import type { Mailbox } from "../../prisma/types";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import MailboxInboxFolder from "~/components/MailboxInboxFolder";

interface MailboxProps {
  mailbox: Mailbox;
  openInitially?: boolean;
}

export default function Mailbox({
  mailbox,
  openInitially = false,
}: MailboxProps) {
  const [isOpen, setIsOpen] = useState(openInitially);

  return (
    <section className="grid cursor-pointer gap-2">
      <header
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="flex items-center justify-between rounded bg-transparent p-2 hover:bg-gray-200"
      >
        <h3>{mailbox.title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        )}
      </header>
      {isOpen && (
        <ul className="grid gap-1 pl-4">
          <li>
            <MailboxInboxFolder title="Inbox" count={mailbox.inbox.length} />
          </li>
          <li>
            <MailboxInboxFolder
              title="Flagged"
              count={mailbox.flagged.length}
            />
          </li>
          <li>
            <MailboxInboxFolder title="Drafts" count={0} />
          </li>
          <li>
            <MailboxInboxFolder title="Send" count={mailbox.send.length} />
          </li>
        </ul>
      )}
    </section>
  );
}