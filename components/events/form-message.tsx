export function FormMessage({ error, success }: { error?: string; success?: string }) {
  if (error) return <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>;
  if (success) return <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">{success}</p>;
  return null;
}
