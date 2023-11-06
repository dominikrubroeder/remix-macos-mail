import type { Mail, Mailbox as IMailbox } from "../../prisma/types";
import Mailbox from "../components/Mailbox";
import IntelligentInboxFolder from "../components/IntelligentInboxFolder";

interface SidebarProps {
  mails: Mail[];
}

export default function Sidebar({ mails }: SidebarProps) {
  const mailboxes: IMailbox[] = [
    {
      title: "Favorites",
      inbox: [
        ...mails.filter(
          (mail) => mail.sender !== "dominik.rubroeder@icloud.com",
        ),
      ],
      flagged: [...mails.filter((mail) => mail.flagged)],
      drafts: [...mails.filter((mail) => mail.isDraft)],
      send: [
        ...mails.filter(
          (mail) => mail.sender === "dominik.rubroeder@icloud.com",
        ),
      ],
    },
    {
      title: "iCloud",
      inbox: [
        ...mails.filter(
          (mail) =>
            mail.mailbox === "iCloud" &&
            mail.sender !== "dominik.rubroeder@icloud.com",
        ),
      ],
      flagged: [
        ...mails.filter((mail) => mail.mailbox === "iCloud" && mail.flagged),
      ],
      drafts: [],
      send: [
        ...mails.filter(
          (mail) =>
            mail.mailbox === "iCloud" &&
            mail.sender === "dominik.rubroeder@icloud.com",
        ),
      ],
    },
  ];

  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100 p-4">
      <div className="grid gap-8">
        <Mailbox mailbox={mailboxes[0]} />

        <IntelligentInboxFolder />

        {mailboxes.map((mailbox) => {
          if (mailbox.title === "Favorites") return null;

          return <Mailbox key={mailbox.title} mailbox={mailbox} />;
        })}
      </div>
    </div>
  );
}
