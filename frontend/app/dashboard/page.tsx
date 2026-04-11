import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { UrgencyBadge } from "@/components/urgency-badge";
import { listTickets } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const tickets = await listTickets().catch(() => []);
  const openTickets = tickets.filter((ticket) =>
    ["new", "acknowledged", "in_progress"].includes(ticket.status),
  );
  const urgentTickets = tickets.filter((ticket) =>
    ["high", "emergency"].includes(ticket.urgency),
  );
  const recentTickets = tickets.slice(0, 5);
  const stats = [
    {
      label: "Total Tickets",
      value: `${tickets.length}`,
      detail: "All dashboard-created intake records currently stored by the backend.",
    },
    {
      label: "Open Tickets",
      value: `${openTickets.length}`,
      detail: "New, acknowledged, and in-progress work still waiting on a full resolution.",
    },
    {
      label: "Urgent Requests",
      value: `${urgentTickets.length}`,
      detail: "High-priority or emergency calls that should stay visible at the top of the queue.",
    },
  ];

  return (
    <AppShell
      title="Dashboard"
      description="A simple control surface for intake visibility, urgency triage, and dispatch follow-up."
    >
      <PageHeader
        eyebrow="Overview"
        title="Today at a glance"
        description="The dashboard is now wired to live ticket data, so this page reflects the same intake records the operator creates in the console."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-line bg-white/90 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Recent Intake</p>
            <h3 className="mt-2 text-2xl font-semibold">Newest tickets</h3>
          </div>
        </div>

        {recentTickets.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">
            No tickets yet. Create your first intake from the Intake Console.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-line bg-mist/70 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{ticket.caller_name}</p>
                    <p className="mt-1 text-sm text-slate-600">{ticket.issue_summary}</p>
                  </div>

                  <div className="flex gap-2">
                    <UrgencyBadge urgency={ticket.urgency} />
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
