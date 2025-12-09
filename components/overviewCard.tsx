export function OverviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-md min-h-30 p-4 flex flex-col justify-between">
      {children}
    </div>
  );
}

export function OverviewField({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
