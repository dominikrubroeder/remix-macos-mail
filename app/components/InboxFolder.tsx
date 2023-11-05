interface MailboxFolderProps {
  title: string;
  count: number;
}

export default function InboxFolder({ title, count }: MailboxFolderProps) {
  return (
    <div className="flex cursor-pointer justify-between gap-2 rounded bg-transparent p-2 hover:bg-gray-200">
      <span>{title}</span>
      <span>{count}</span>
    </div>
  );
}
