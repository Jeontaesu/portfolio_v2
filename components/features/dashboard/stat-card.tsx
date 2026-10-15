type StatCardProps = {
  label: string;
  value: number;
  /** Plain-language second line, e.g. "18 published". */
  detail: string;
};

/** One real count from the database. No trend arrows or view counts until that data exists (DESIGN §6.2). */
export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <div className="border border-border p-6">
      <dt className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
        {label}
      </dt>
      <dd className="mt-2">
        <span className="text-h2">{value}</span>
        <span className="mt-1 block text-body-sm text-secondary">{detail}</span>
      </dd>
    </div>
  );
}
