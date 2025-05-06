export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-white text-black text-md w-[100%] flex justify-center items-center gap-2 shadow-2xl shadow-[#2D2D61]">
      {children}
      <img src="/public/icons/chevron_right_black.svg" alt="chevron right" />
    </button>
  );
}
