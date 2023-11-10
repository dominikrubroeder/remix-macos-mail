import { useFetcher } from "@remix-run/react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteMailButton({ mailId }: { mailId: number }) {
  const fetcher = useFetcher({ key: "mail.delete" });
  return (
    <fetcher.Form method="post" action={`/mail/delete/${mailId}`}>
      <button
        type="submit"
        className="rounded bg-transparent p-2 hover:bg-gray-200"
      >
        <TrashIcon className="h-5 w-5 text-gray-400" />
      </button>
    </fetcher.Form>
  );
}
