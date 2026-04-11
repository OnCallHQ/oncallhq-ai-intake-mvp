"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createTicket } from "@/lib/api";

const initialForm = {
  caller_name: "",
  callback_phone: "",
  service_address: "",
  issue_summary: "",
  transcript: "",
};

export function IntakeForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      try {
        const ticket = await createTicket({
          ...form,
          transcript: form.transcript || undefined,
        });
        setForm(initialForm);
        setSuccessMessage(`Ticket created for ${ticket.caller_name}.`);
        router.push(`/tickets/${ticket.id}`);
        router.refresh();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "We couldn't create the intake ticket.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-line bg-white/90 p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium text-slate-700">Caller name</span>
          <input
            required
            value={form.caller_name}
            onChange={(event) => setForm((current) => ({ ...current, caller_name: event.target.value }))}
            className="w-full rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-brand"
            placeholder="Jamie Turner"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block font-medium text-slate-700">Callback phone</span>
          <input
            required
            value={form.callback_phone}
            onChange={(event) => setForm((current) => ({ ...current, callback_phone: event.target.value }))}
            className="w-full rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-brand"
            placeholder="+1 615 555 1212"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="mb-2 block font-medium text-slate-700">Service address</span>
          <input
            required
            value={form.service_address}
            onChange={(event) => setForm((current) => ({ ...current, service_address: event.target.value }))}
            className="w-full rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-brand"
            placeholder="123 Cedar St, Nashville, TN"
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="mb-2 block font-medium text-slate-700">Issue summary</span>
          <textarea
            required
            value={form.issue_summary}
            onChange={(event) => setForm((current) => ({ ...current, issue_summary: event.target.value }))}
            className="min-h-28 w-full rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-brand"
            placeholder="Customer reports water heater leaking into the garage."
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="mb-2 block font-medium text-slate-700">Transcript or intake notes</span>
          <textarea
            value={form.transcript}
            onChange={(event) => setForm((current) => ({ ...current, transcript: event.target.value }))}
            className="min-h-40 w-full rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-brand"
            placeholder="Optional raw conversation transcript, voicemail notes, or dispatcher notes."
          />
        </label>
      </div>

      <div className="rounded-2xl border border-dashed border-line bg-mist p-4 text-sm text-slate-600">
        This is the dashboard-first intake console. Phone, voicemail, or webhooks can later feed the same ticket creation pipeline.
      </div>

      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      {successMessage ? <p className="text-sm text-emerald-700">{successMessage}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating ticket..." : "Create intake ticket"}
      </button>
    </form>
  );
}
