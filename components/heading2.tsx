export default function Heading2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-2xl font-bold mt-6 mb-2">
      <div className="bg-text h-0.5 w-6 mb-1"></div>
      <div>{children}</div>
    </h2>
  );
}
