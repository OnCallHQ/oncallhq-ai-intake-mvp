import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

const rows = [
  {
    customer: "Jamie Turner",
    issue: "Water heater leaking",
    urgency: "High",
    location: "Nashville, TN",
  },
  {
    customer: "Alex Rivera",
    issue: "No AC airflow",
    urgency: "Medium",
    location: "Franklin, TN",
  },
];

export default function TicketsPage() {
  return (
    <AppShell
      title="Tickets"
      description="A clean table shell for intake records created from missed calls."
    >
      <PageHeader
        eyebrow="Queue"
        title="Intake tickets"
        description="Static placeholder records keep the screen grounded while the API and database are still being wired up."
      />

      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="min-w-full divide-y divide-line bg-white">
          <thead className="bg-mist">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Urgency</th>
              <th className="px-4 py-3 font-medium">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-sm">
            {rows.map((row) => (
              <tr key={`${row.customer}-${row.issue}`}>
                <td className="px-4 py-4">{row.customer}</td>
                <td className="px-4 py-4">{row.issue}</td>
                <td className="px-4 py-4">{row.urgency}</td>
                <td className="px-4 py-4">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
