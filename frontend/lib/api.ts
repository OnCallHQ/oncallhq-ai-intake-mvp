import { ManualIntakePayload, Ticket, TicketStatus } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function listTickets(): Promise<Ticket[]> {
  return apiRequest<Ticket[]>("/tickets");
}

export async function getTicket(ticketId: string): Promise<Ticket> {
  return apiRequest<Ticket>(`/tickets/${ticketId}`);
}

export async function createTicket(payload: ManualIntakePayload): Promise<Ticket> {
  return apiRequest<Ticket>("/tickets", {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      source: payload.source ?? "dashboard",
    }),
  });
}

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus,
): Promise<Ticket> {
  return apiRequest<Ticket>(`/tickets/${ticketId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
