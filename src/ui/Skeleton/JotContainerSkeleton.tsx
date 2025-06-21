export default function JotContainerSkeleton() {
    return (
      <>
        {/* this is the top header section of the skeleton */}
        <div className="flex justify-between items-center w-full">
          {/* this is the left section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div
                className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
                style={{ animationDelay: `0.2s`, width: `40px` }}
              />
              <div
                className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
                style={{ animationDelay: `0.2s`, width: `10px` }}
              />
              <div
                className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
                style={{ animationDelay: `0.2s`, width: `56px` }}
              />
            </div>
            <div
              className="h-3 bg-[#543A8B] rounded-xl animate-pulse"
              style={{ animationDelay: `0.2s`, width: `60px` }}
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
  
        {/* this is the jot skeleton  */}
        <div className="flex flex-col gap-2 p-4 h-[20vh] w-full bg-[#0f0f0f] rounded-xl">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="flex items-center gap-4 w-full" key={index}>
              <div
                className="bg-[#543A8B] rounded-md h-4 w-8 animate-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              ></div>
              <div
                className="h-4 bg-[#543A8B] rounded-md animate-pulse"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  width: `${Math.floor(Math.random() * (90 - 50 + 1) + 50)}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </>
    );
  }
  