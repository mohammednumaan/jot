import { ChangeEvent, useState } from "react";
import InputField from "../Form/components/InputField";

export default function CreateJot() {
  const [filename, setFilename] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value)
  }

  return (
    <div className="min-h-[70vh] w-full bg-[#080808] rounded-xl">
      {/* this is the jot editor's container */}
      <div className="p-10">
        {/* jot editor's header */}
        <div className="flex justify-start items-center">
          <div className="w-[30%]">
            <InputField
              name="jot_filename"
              value={filename}
              placeholder={"Filename with extension."}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
