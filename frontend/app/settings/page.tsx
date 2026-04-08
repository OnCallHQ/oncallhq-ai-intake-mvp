import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

const settings = [
  "Business profile and service area",
  "Dispatch notification preferences",
  "Webhook and provider credentials",
];

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="A placeholder settings surface for the configuration areas the MVP will eventually need."
    >
      <PageHeader
        eyebrow="Configuration"
        title="Setup surfaces"
        description="These are just anchors for the product shape. No forms or persistence have been added yet."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {settings.map((item) => (
          <div key={item} className="rounded-2xl border border-line bg-mist p-5">
            <h4 className="text-lg font-semibold">{item}</h4>
            <p className="mt-2 text-sm text-slate-600">
              Reserved for a later implementation pass.
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
