import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { UrgencyBadge } from "@/components/urgency-badge";
import { listTickets } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  const tickets = await listTickets().catch(() => []);

  return (
    <AppShell
      title="Tickets"
      description="A live queue of intake records created from the dashboard-first workflow."
    >
      <PageHeader
        eyebrow="Queue"
        title="Intake tickets"
        description="Each row comes from the backend ticket store, which means this screen is already exercising the same flow future phone intake will use."
      />

      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="min-w-full divide-y divide-line bg-white">
          <thead className="bg-mist">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-4 py-3 font-medium">Caller</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Urgency</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-sm">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-600">
                  No tickets yet. Create one from the Intake Console to start the workflow.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-mist/50">
                  <td className="px-4 py-4 font-medium text-ink">
                    <Link href={`/tickets/${ticket.id}`} className="hover:text-brand">
                      {ticket.caller_name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{ticket.issue_summary}</td>
                  <td className="px-4 py-4">
                    <UrgencyBadge urgency={ticket.urgency} />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 py-4">{ticket.service_address}</td>
                  <td className="px-4 py-4 text-slate-500">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
