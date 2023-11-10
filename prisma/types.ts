import type { Mail } from "@prisma/client";
import type React from "react";

export interface Mailbox {
  title: string;
  inbox: Mail[];
  flagged: Mail[];
  drafts: Mail[];
  send: Mail[];
}

export type OutletContextType = {
  newMailDialog: boolean;
  setNewMailDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
