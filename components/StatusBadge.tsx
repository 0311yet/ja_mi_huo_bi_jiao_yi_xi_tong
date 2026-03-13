interface StatusBadgeProps {
  text: string;
  online?: boolean;
}

export function StatusBadge({ text, online = true }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span className={`h-2.5 w-2.5 rounded-full ${online ? "bg-profit" : "bg-danger"}`} />
      {text}
    </div>
  );
}
