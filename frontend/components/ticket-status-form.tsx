"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateTicketStatus } from "@/lib/api";
import { TicketStatus } from "@/lib/types";

const statusOptions: TicketStatus[] = [
  "new",
  "acknowledged",
  "in_progress",
  "resolved",
  "closed",
];

export function TicketStatusForm({
  ticketId,
  currentStatus,
}: {
  ticketId: string;
  currentStatus: TicketStatus;
}) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(currentStatus);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-700">Ticket status</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value as TicketStatus)}
          className="rounded-2xl border border-line px-4 py-3 outline-none focus:border-brand"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>

        <button
          type="button"
          disabled={isPending || selectedStatus === currentStatus}
          onClick={() =>
            startTransition(async () => {
              setMessage(null);
              setError(null);
              try {
                await updateTicketStatus(ticketId, selectedStatus);
                setMessage("Status updated.");
                router.refresh();
              } catch (updateError) {
                setError(
                  updateError instanceof Error
                    ? updateError.message
                    : "We couldn't update the ticket status.",
                );
              }
            })
          }
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Update status"}
        </button>
      </div>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}
