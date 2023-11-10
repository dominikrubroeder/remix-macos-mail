import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useOutletContext,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { useState } from "react";
import type { OutletContextType } from "../prisma/types";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const [newMailDialog, setNewMailDialog] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet
          context={
            { newMailDialog, setNewMailDialog } satisfies OutletContextType
          }
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function useContext() {
  return useOutletContext<OutletContextType>();
}

/** @TODO
 * - Filter list
 * - Unread property
 * - Refine load new mails
 * - Animate New Mail appearance
 * - Draft when click outside, Draft when click on Minimize
 * */
