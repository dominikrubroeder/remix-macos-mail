import type { JSX } from "react";

interface MailboxFolderProps {
  title: string;
  count: number;
  icon: JSX.Element;
}

export default function InboxFolder({
  title,
  count,
  icon,
}: MailboxFolderProps) {
  return (
    <div className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
      <div className="flex items-center gap-2">
        <span>{icon}</span> <h3>{title}</h3>
      </div>
      <span>{count}</span>
    </div>
  );
}
