export default function JotViewContainerSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-1">
          <div
            className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
            style={{ animationDelay: `0.2s`, width: `60px` }}
          />
          <div
            className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
            style={{ animationDelay: `0.2s`, width: `10px` }}
          />
          <div
            className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
            style={{ animationDelay: `0.2s`, width: `70px` }}
          />
        </div>
        <div
          className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
          style={{ animationDelay: `0.2s`, width: `110px` }}
        />
          <div
          className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
          style={{ animationDelay: `0.2s`, width: `100px` }}
        />
      </div>
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
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Line number skeleton */}
              <div
                className="h-3 w-8 bg-[#543A8B] rounded-md animate-pulse"
                style={{ animationDelay: `${index * 0.2}s`, width: `40px` }}
              ></div>
              {/* Code line skeleton */}
              <div
                className="h-3 w-full bg-[#543A8B] rounded-md animate-pulse"
                style={{ animationDelay: `${index * 0.2}s`, width: `${Math.floor(Math.random() * (90 - 50 + 1) + 50)}%`}}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
