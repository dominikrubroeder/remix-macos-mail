import type { Mail } from "@prisma/client";

export default function MailPreview({ mail }: { mail: Mail }) {
  return (
    <>
      <header>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">
            <span
              className={`mr-2 inline-block h-3 w-3 rounded-full border border-blue-400 ${
                mail.read ? "bg-transparent" : "bg-blue-400"
              }`}
            ></span>
            <span className="inline-block font-normal text-gray-400">
              {mail.id}
            </span>{" "}
            {mail.sender}
          </h2>
          <span
            className={`text-xs ${
              mail.isCurrentMail ? "text-white/40" : "text-gray-400"
            }`}
          >
            {mail.date}
          </span>
        </div>
        <h3>{mail.subject}</h3>
      </header>
      <p
        className={`group-hover:text-white/40 ${
          mail.isCurrentMail ? "text-white/40" : "text-gray-400"
        }`}
      >
        {mail.content}
      </p>
    </>
  );
}
