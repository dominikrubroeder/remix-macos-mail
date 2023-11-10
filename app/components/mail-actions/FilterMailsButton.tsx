import { useFetcher } from "@remix-run/react";

export default function FilterMailsButton() {
  const fetcher = useFetcher();
  return <fetcher.Form method="post" action="/mail/filter"></fetcher.Form>;
}
