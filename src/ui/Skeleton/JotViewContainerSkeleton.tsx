export default function JotViewContainerSkeleton() {
  return (
    <div className="relative flex flex-col gap-4 p-4 bg-[#0f0f0f] rounded-xl w-full">
      {/* filename with logo skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div
            className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
            style={{ animationDelay: `0.2s`, width: `20px` }}
          />
          <div
            className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
            style={{ animationDelay: `0.2s`, width: `60px` }}
          />
        </div>

        <div className="">
          <div className="h-8 w-24 bg-[#543A8B] rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* code skeleton */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Line number skeleton */}
            <div className="h-3 w-8 bg-[#543A8B] rounded-md animate-pulse"></div>
            {/* Code line skeleton */}
            <div className="h-3 w-full bg-[#543A8B] rounded-md animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
