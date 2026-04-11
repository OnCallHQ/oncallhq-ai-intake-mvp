import { AppShell } from "@/components/app-shell";
import { IntakeForm } from "@/components/intake-form";
import { PageHeader } from "@/components/page-header";

export default function IntakePage() {
  return (
    <AppShell
      title="Intake Console"
      description="Capture missed-call details manually now, then reuse the same pipeline when telephony is connected later."
    >
      <PageHeader
        eyebrow="Operator Flow"
        title="Create a real intake ticket"
        description="This is the fastest path to a working product loop: collect the job details, classify urgency, save the ticket, and hand it off cleanly."
      />

      <IntakeForm />
    </AppShell>
  );
}
