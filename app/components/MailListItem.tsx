import type { Mail } from "../../prisma/types";

interface MailListItemProps {
  mail: Mail;
  currentMail: Mail;
}

export default function MailListItem({ mail, currentMail }: MailListItemProps) {
  return (
    <>
      <header>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{mail.sender}</h2>
          <span
            className={`text-xs ${
              mail.id === currentMail.id ? "text-white/40" : "text-gray-400"
            }`}
          >
            {mail.date}
          </span>
        </div>
        <h3>{mail.subject}</h3>
      </header>
      <p
        className={`group-hover:text-white/40 ${
          mail.id === currentMail.id ? "text-white/40" : "text-gray-400"
        }`}
      >
        {mail.content}
      </p>
    </>
  );
}
