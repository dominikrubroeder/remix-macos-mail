import type { Mail } from "../../prisma/types";

interface MailViewProps {
  currentMail: Mail;
}

export default function MailView({ currentMail }: MailViewProps) {
  return (
    <div className="overflow-hidden overflow-y-scroll">
      <header className="sticky top-0 flex items-start justify-between bg-gray-100/90 p-4 px-8 backdrop-blur">
        <div className="flex gap-4">
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
      </header>
      <div className="p-4">{currentMail.content}</div>
    </div>
  );
}
