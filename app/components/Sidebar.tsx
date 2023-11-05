import { Mailbox } from "../../prisma/types";
import type { Mail } from "../../prisma/types";
import Mailbox from "../components/Mailbox";

const intelligentMailboxes: string[] = ["Intelligente Postfächer"];

interface SidebarProps {
  mails: Mail[];
}

export default function Sidebar({ mails }: SidebarProps) {
  const mailboxes: Mailbox[] = [
    {
      title: "Favorites",
      inbox: [...mails],
      flagged: [],
      drafts: [],
      send: [],
    },
    {
      title: "iCloud",
      inbox: [...mails.filter((mail) => mail.inbox === "iCloud")],
      flagged: [
        ...mails.filter((mail) => mail.inbox === "iCloud" && mail.flagged),
      ],
      drafts: [],
      send: [
        ...mails.filter(
          (mail) =>
            mail.inbox === "iCloud" &&
            mail.sender === "dominik.rubroeder@icloud.com",
        ),
      ],
    },
  ];

  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100 p-4">
      <div className="grid gap-8">
        <section className="grid gap-2">
          <h3>{mailboxes[0].title}</h3>
          <ul className="grid gap-1 pl-4  ">
            <li className="flex cursor-pointer justify-between gap-2 rounded bg-gray-200 p-2">
              Eingang
            </li>
            <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
              <span>Markiert</span>
              <span>{mails.filter((mail) => mail.flagged).length}</span>
            </li>
            <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
              Entwürfe
            </li>
            <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
              Gesendet
            </li>
          </ul>
        </section>

        {intelligentMailboxes.map((intelligentMailbox) => (
          <section key={intelligentMailbox} className="grid gap-2">
            <h3>Intelligente Postfächer</h3>
            <ul className="grid gap-1 pl-4  ">
              <li className="flex cursor-pointer justify-between gap-2 rounded bg-gray-200 p-2">
                Eingang
              </li>
              <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
                <span>Markiert</span>
                <span>{mails.filter((mail) => mail.flagged).length}</span>
              </li>
              <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
                Entwürfe
              </li>
              <li className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
                Gesendet
              </li>
            </ul>
          </section>
        ))}

        {mailboxes.map((mailbox) => {
          if (mailbox.title === "Favorites") return null;

          return <Mailbox mailbox={mailbox} />;
        })}
      </div>
    </div>
  );
}
