import { TicketUrgency } from "@/lib/types";

const urgencyStyles: Record<TicketUrgency, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-orange-100 text-orange-800",
  emergency: "bg-rose-100 text-rose-700",
};

export function UrgencyBadge({ urgency }: { urgency: TicketUrgency }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${urgencyStyles[urgency]}`}>
      {urgency}
    </span>
  );
}
