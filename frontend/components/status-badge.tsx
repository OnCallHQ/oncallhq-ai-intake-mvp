import { TicketStatus } from "@/lib/types";

const statusStyles: Record<TicketStatus, string> = {
  new: "bg-slate-100 text-slate-700",
  acknowledged: "bg-sky-100 text-sky-700",
  in_progress: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-700",
  closed: "bg-zinc-200 text-zinc-700",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
