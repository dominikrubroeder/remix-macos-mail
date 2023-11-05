export interface Mail {
  id: number;
  sender: string;
  subject: string;
  receiver: string;
  date: string;
  content: string;
  mailbox: string;
  isDraft: boolean;
  flagged: boolean;
}

export interface Mailbox {
  title: string;
  inbox: Mail[];
  flagged: Mail[];
  drafts: Mail[];
  send: Mail[];
}
