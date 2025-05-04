import React from "react";

interface InputFieldProps {
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  children,
}: InputFieldProps) {
  return (
    <label className=" flex justify-center items-center gap-2 p-2 w-[100%] bg-[#181818] rounded-md">
      {children}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 w-[100%]"
        required
      ></input>
    </label>
  );
}
