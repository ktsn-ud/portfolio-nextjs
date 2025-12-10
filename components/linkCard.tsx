import type { Meta } from "@/lib/meta";

interface LinkCardProps {
  href: string;
  meta: Meta;
}

export default function LinkCard({ href, meta }: LinkCardProps) {
  const domain = new URL(href).hostname;
  return (
    <a href={meta.url ?? href} target="_blank" rel="noopener noreferrer">
      <div className="flex justify-between w-full h-30 my-4 border border-border rounded-md hover:shadow-lg transition-shadow overflow-hidden">
        <div className="flex flex-col justify-between w-3/4 p-6">
          <div>
            <div className="font-bold lg:mb-1 truncate">{meta.title}</div>
            <div className="text-xs my-1 truncate">{meta.description}</div>
          </div>
          <div className="text-xs text-gray-500 mt-2">{domain}</div>
        </div>
        <div className="grow bg-white">
          {meta.image && (
            <img
              src={meta.image}
              alt={meta.title || "link preview image"}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </a>
  );
}
