import type { JSX } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix | macOS | Apple Mail" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface Mail {
  title: string;
  sender: string;
  subject: string;
  receiver: string;
  date: Date;
  content: JSX.Element;
}

const mails: Mail[] = [
  {
    title: "This is the first Email",
    sender: "dominik.rubroeder@icloud.com",
    subject: "Building the base UI",
    receiver: "dominik.rubroeder@mediawave.de",
    date: new Date(),
    content: <div>This is the mail content!</div>,
  },
  {
    title: "A second email",
    sender: "dominik.rubroeder@icloud.com",
    subject: "Adding some more data",
    receiver: "dominik.rubroeder@mediawave.de",
    date: new Date(),
    content: <div>This is second's mail content!</div>,
  },
  {
    title: "The third",
    sender: "dominik.rubroeder@icloud.com",
    subject: "Let's see where this is going",
    receiver: "dominik.rubroeder@mediawave.de",
    date: new Date(),
    content: <div>This is the third's mail content!</div>,
  },
];

export default function Index() {
  return (
    <main className="grid min-h-screen grid-cols-[1fr_2fr_4fr]">
      <div className="border-r bg-gray-100 p-4">Sidebar</div>
      <div className="border-r bg-gray-100">
        <header className="grid gap-1 p-4">
          <h2 className="text-lg font-semibold leading-none">Eingang</h2>
          <p className="leading-none">{mails.length} E-Mails</p>
        </header>
        <ul className="grid gap-4 px-8 py-4">
          {mails.map((mail) => (
            <li key={mail.title} className="border-b pb-4">
              <header>
                <div className="flex justify-between gap-4">
                  <h2 className="text-lg font-semibold">{mail.sender}</h2>
                  <span className="text-xs text-gray-400">
                    {mail.date.toDateString()}
                  </span>
                </div>
                <h3>{mail.subject}</h3>
              </header>
              <p className="text-gray-400">{mail.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">{mails[0].content}</div>
    </main>
  );
}
