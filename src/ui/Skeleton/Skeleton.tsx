export default function JotSkeleton() {
    const skeletonCount = 10; 
  
    return (
      <div className="flex flex-col gap-2 p-4 min-h-[30vh] w-full bg-[#0f0f0f] rounded-xl">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            className="flex items-center gap-4 w-full"
            key={index}
          >
            <div className="bg-[#543A8B] rounded-md h-4 w-8 animate-pulse"></div>
            <div
              className={`h-4 bg-[#543A8B] rounded-md animate-pulse`}
              style={{
                width: `${Math.floor(Math.random() * (90 - 50 + 1) + 50)}%`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  }