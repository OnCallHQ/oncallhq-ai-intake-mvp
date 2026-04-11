import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { TicketStatusForm } from "@/components/ticket-status-form";
import { UrgencyBadge } from "@/components/urgency-badge";
import { getTicket } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id).catch(() => null);

  if (!ticket) {
    notFound();
  }

  return (
    <AppShell
      title="Ticket Detail"
      description="A full operator view of one intake record, including summary, raw notes, and dispatch status."
    >
      <PageHeader
        eyebrow="Ticket"
        title={ticket.caller_name}
        description={ticket.summary}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-line bg-white/90 p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <UrgencyBadge urgency={ticket.urgency} />
              <StatusBadge status={ticket.status} />
            </div>

            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">Callback phone</dt>
                <dd className="mt-1 text-base">{ticket.callback_phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Service address</dt>
                <dd className="mt-1 text-base">{ticket.service_address}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-slate-500">Issue summary</dt>
                <dd className="mt-1 text-base">{ticket.issue_summary}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-slate-500">Generated summary</dt>
                <dd className="mt-1 text-base">{ticket.summary}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-line bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Transcript or notes</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
              {ticket.transcript ?? "No raw transcript was captured for this ticket."}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <TicketStatusForm ticketId={ticket.id} currentStatus={ticket.status} />

          <div className="rounded-3xl border border-line bg-mist/80 p-6">
            <h3 className="text-lg font-semibold">Metadata</h3>
            <dl className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <dt className="font-medium text-slate-500">Source</dt>
                <dd className="mt-1 capitalize">{ticket.source}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Emergency flag</dt>
                <dd className="mt-1">{ticket.emergency ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Created</dt>
                <dd className="mt-1">{new Date(ticket.created_at).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Updated</dt>
                <dd className="mt-1">{new Date(ticket.updated_at).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
