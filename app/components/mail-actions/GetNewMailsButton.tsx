import { useFetcher } from "@remix-run/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function GetNewMailsButton() {
  const fetcher = useFetcher({ key: "mail.all" });
  return (
    <fetcher.Form method="get" action="/mail/all">
      <button
        className="rounded bg-transparent p-2 hover:bg-gray-200"
        type="submit"
      >
        <EnvelopeIcon className="h-5 w-5 font-bold text-gray-400" />
      </button>
    </fetcher.Form>
  );
}
