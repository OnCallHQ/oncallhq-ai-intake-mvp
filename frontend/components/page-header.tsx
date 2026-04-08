export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
    </div>
  );
}
