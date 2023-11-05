import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import MailboxInboxFolder from "~/components/MailboxInboxFolder";
import { useState } from "react";
import type { Mail } from "../../prisma/types";

interface IntelligentInbox {
  title: string;
  mails: Mail[];
}

const intelligentInboxes: IntelligentInbox[] = [];

export default function IntelligentInboxFolder() {
  const [isOpen, setIsOpen] = useState(false);

  const intelligentInboxesExist = intelligentInboxes.find(
    (intelligentInbox) => intelligentInbox.title,
  );

  return (
    <section className="grid cursor-pointer gap-2">
      <header
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="flex items-center justify-between rounded bg-transparent p-2 hover:bg-gray-200"
      >
        <h3>Intelligent Inboxes</h3>
        {intelligentInboxesExist ? (
          isOpen ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          )
        ) : null}
      </header>
      {isOpen && intelligentInboxes.length > 0 && (
        <ul className="grid gap-1 pl-4">
          <li>
            {intelligentInboxes.map((intelligentInbox) => (
              <MailboxInboxFolder
                key={intelligentInbox.title}
                title={intelligentInbox.title}
                count={intelligentInbox.mails.length}
              />
            ))}
          </li>
        </ul>
      )}
    </section>
  );
}
