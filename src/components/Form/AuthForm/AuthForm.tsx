export default function AuthForm({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
            h-[90vh] 
            flex justify-center items-center"
    >
      <div
        className="
             bg-[#0F0F0F]
             h-[60vh] min-w-[30%] max-w-full
             flex justify-center items-center flex-col
             rounded-2xl
             shadow-md
             shadow-[#242424]
    "
      >
        {/* this is the actual auth form */}
        <div className="w-[100%] p-5 flex justify-center items-center flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
