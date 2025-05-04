import { Toaster } from "react-hot-toast";

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
        min-h-[50%] min-w-[40%] max-w-full max-h-full
        flex justify-center items-center flex-col
        rounded-2xl
        shadow-md
        shadow-[#242424]
        "
      >
        {/* this is the actual auth form */}
        <Toaster
          toastOptions={{
            position: 'top-right',
            duration: 3000,
            style: {
              backgroundImage:
                "linear-gradient(to right, #4d179a 60%, #826684)",
              color: "white",
              borderRadius: "8px",
              width: "100%",
            },
          }}
        />
        <div className="w-[100%] p-5 flex justify-center items-center flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
