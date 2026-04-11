export type TicketUrgency = "low" | "medium" | "high" | "emergency";
export type TicketStatus =
  | "new"
  | "acknowledged"
  | "in_progress"
  | "resolved"
  | "closed";
export type TicketSource = "dashboard" | "webhook";

export type Ticket = {
  id: string;
  caller_name: string;
  callback_phone: string;
  service_address: string;
  issue_summary: string;
  transcript: string | null;
  summary: string;
  urgency: TicketUrgency;
  emergency: boolean;
  status: TicketStatus;
  source: TicketSource;
  created_at: string;
  updated_at: string;
};

export type ManualIntakePayload = {
  caller_name: string;
  callback_phone: string;
  service_address: string;
  issue_summary: string;
  transcript?: string;
  source?: TicketSource;
};
