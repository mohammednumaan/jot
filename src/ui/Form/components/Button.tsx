export default function Button({ children, width }: { children: React.ReactNode, width?: string }) {
  return (
    <button className={`bg-white text-black text-md w-[${width ? width : '100%'}] flex justify-center items-center gap-2 shadow-2xl shadow-[#2D2D61]`}>
      {children}
      <img src="/public/icons/chevron_right_black.svg" alt="chevron right" />
    </button>
  );
}
