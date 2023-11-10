import type { Mail } from "@prisma/client";

export interface Mailbox {
  title: string;
  inbox: Mail[];
  flagged: Mail[];
  drafts: Mail[];
  send: Mail[];
}
