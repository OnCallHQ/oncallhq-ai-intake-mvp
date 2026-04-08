import Link from "next/link";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tickets", label: "Tickets" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:flex-row lg:gap-8">
        <aside className="mb-6 rounded-3xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur lg:mb-0 lg:w-72">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">OnCallHQ</p>
            <h1 className="mt-2 text-3xl font-semibold">Missed calls into booked jobs.</h1>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-transparent px-4 py-3 text-sm transition hover:border-line hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 rounded-3xl border border-line bg-white/85 p-6 shadow-sm backdrop-blur">
          <header className="mb-8 border-b border-line pb-5">
            <p className="text-sm uppercase tracking-[0.2em] text-brand">MVP Workspace</p>
            <h2 className="mt-2 text-4xl font-semibold">{title}</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
