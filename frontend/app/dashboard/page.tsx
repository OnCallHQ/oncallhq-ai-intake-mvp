import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";

const stats = [
  { label: "Missed Calls", value: "12", detail: "Placeholder dashboard data for the MVP shell." },
  { label: "Open Tickets", value: "7", detail: "Will be wired to backend ticket data later." },
  { label: "Urgent Requests", value: "2", detail: "Reserved for extracted urgency signals." },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="A simple control surface for missed-call intake, ticket visibility, and dispatch follow-up."
    >
      <PageHeader
        eyebrow="Overview"
        title="Today at a glance"
        description="This page is intentionally light. It gives the product a clear starting point without locking us into a heavier dashboard architecture."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
    </AppShell>
  );
}
