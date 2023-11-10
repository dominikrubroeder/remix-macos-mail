import { FlagIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";

export default function FlagMailButton({
  id,
  flagged,
}: {
  id: number;
  flagged: boolean;
}) {
  const fetcher = useFetcher({ key: "flag-mail" });
  return (
    <fetcher.Form method="post" action={`/mail/flag/${id}`}>
      <input type="checkbox" name="flagged" hidden defaultChecked={flagged} />
      <button className="rounded bg-transparent p-2 hover:bg-gray-200">
        <FlagIcon
          className={`h-5 w-5 font-bold text-gray-400 ${
            flagged ? "fill-orange-400 text-orange-400" : "fill-none"
          }`}
        />
      </button>
    </fetcher.Form>
  );
}
