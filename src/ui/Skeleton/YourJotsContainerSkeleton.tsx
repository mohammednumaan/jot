export default function YourJotsContainerSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 p-4 w-full bg-[#0f0f0f] rounded-xl">
        <div className="flex justify-between items-center w-full">
          {/* this is the left section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div
                className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
                style={{ animationDelay: `0.2s`, width: `50px` }}
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
              style={{ animationDelay: `0.2s`, width: `64px` }}
            />
          </div>

          {/* this is the right section*/}
          <div className="flex items-center gap-1">
            <div
              className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
              style={{ animationDelay: `0.2s`, width: `20px` }}
            />
            <div
              className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
              style={{ animationDelay: `0.2s`, width: `40px` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
