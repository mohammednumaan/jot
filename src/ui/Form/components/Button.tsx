import { MouseEventHandler } from "react";

export default function Button({
  children,
  width,
  onClick,
  imagePath
}: {
  children: React.ReactNode;
  width?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  imagePath?: string
}) {
  return (
    <button
      onClick={onClick && onClick}
      className={`bg-white text-black text-md w-[${
        width ? width : "100%"
      }] flex justify-center items-center gap-2 shadow-2xl shadow-[#2D2D61]`}
    >
      {children}
      <img src={imagePath ? imagePath : "/public/icons/chevron_right_black.svg"} alt="button icon" />
    </button>
  );
}
