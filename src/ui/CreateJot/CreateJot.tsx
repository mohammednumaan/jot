import { ChangeEvent, useState } from "react";
import InputField from "../Form/components/InputField";
import { IJotState } from "../../core/types/jot/create_jot.types";
import { apiPostRequest } from "../../core/utils/request.utils";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../core/types/api/response";
import { asyncResponseErrorHandler } from "../../core/errors/errors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../Form/components/Button";
import Editor from "../Editor/Editor";

export default function CreateJot() {
  const navigate = useNavigate();

  const [jotData, setJotData] = useState<IJotState>({
    name: "",
    content: "",
    description: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setJotData({ ...jotData, [key]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJotData({ ...jotData, content: e.target.value });
  };

  const handleJotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: IJotState = {
      name: jotData.name,
      content: jotData.content,
      description: jotData.description,
    };

    const response = await apiPostRequest<
      IJotState,
      ApiErrorResponse | ApiSucessResponse<IJotState>
    >("jots/create", payload);

    if (!response.success) {
      const errors = asyncResponseErrorHandler(response);
      for (const err of errors) {
        toast(err);
      }
    } else {
      toast.success("Jot created successfully!");
      setTimeout(() => {
        navigate("/client/discover");
      }, 3500);
    }
  };

  return (
    <div className="min-h-[70vh] w-full bg-[#080808] rounded-xl">
      {/* this is the jot editor's container */}
      <form
        onSubmit={handleJotSubmit}
        className="flex justify-start items-start flex-col gap-5 p-10"
      >
        {/* jot editor's header */}
        <div className="flex justify-start items-center">
          <div>
            <InputField
              name="name"
              value={jotData.name}
              placeholder={"Filename with extension."}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* jot editor's text area */}
        <div className="flex min-h-[60vh] w-full bg-[#131313] rounded-xl">
          <Editor
            textAreaValue={jotData.content}
            handleTextChange={handleTextareaChange}
            readonly={false}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button width={"20%"}>Create Jot</Button>
        </div>
      </form>
    </div>
  );
}
