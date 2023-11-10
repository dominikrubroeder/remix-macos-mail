import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import InboxFolder from "~/components/InboxFolder";
import { useState } from "react";
import type { Mail } from "@prisma/client";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

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
              <InboxFolder
                key={intelligentInbox.title}
                title={intelligentInbox.title}
                icon={<Cog8ToothIcon className="h-5 w-5 text-gray-400" />}
                count={intelligentInbox.mails.length}
              />
            ))}
          </li>
        </ul>
      )}
    </section>
  );
}
