import { MouseEventHandler } from "react";

export default function Button({
  children,
  width,
  onClick,
  imagePath,
  disabled,
}: {
  children: React.ReactNode;
  width?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  imagePath?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`text-sm  flex justify-center items-center gap-2 shadow-2xl shadow-[#2D2D61] ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-white text-black hover:bg-[#f3f3f3]"
      } rounded-md transition-all duration-300`}
      style={{
        width: width ? width : '100%'
      }}
    >
      {children}
      <img
        src={imagePath ? imagePath : "/public/icons/chevron_right_black.svg"}
        alt="button icon"
      />
    </button>
  );
}
