import { ChangeEvent, MouseEvent, useState } from "react";
import InputField from "../Form/components/InputField";
import { IJotPayload, IJotState } from "../../core/types/jot/create_jot.types";
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
import { v4 as uuidv4 } from "uuid";

export default function CreateJot() {
  const navigate = useNavigate();

  const [editors, setEditors] = useState([
    {
      id: uuidv4(),
      name: "",
      content: "",
    },
  ]);
  const [selectedJot, setSelectedJot] = useState(editors[0]);
  const [description, setDescription] = useState("");

  const handleAddEditor = () => {
    const existingEditors = editors;
    const newEditor: IJotPayload = {
      id: uuidv4(),
      name: "",
      content: "",
    };
    setEditors([...existingEditors, newEditor]);
  };

  const handleSelectEditor = (editorId: string) => {
    const selectedEditor = editors.filter((editor) => editor.id === editorId);
    setSelectedJot(selectedEditor[0]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    const updatedEditor = { ...selectedJot, [key]: value };
    console.log(updatedEditor);

    const newEditors = [...editors].map((editor) => {
      if (editor.id === selectedJot.id) {
        editor = updatedEditor;
      }

      return editor;
    });

    setEditors(newEditors);
    setSelectedJot(updatedEditor);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedEditor = { ...selectedJot, content: e.target.value };
    const newEditors = editors.map((editor) => {
      if (editor.id === selectedJot.id) {
        editor = selectedJot;
      }
      return editor;
    });
    setEditors(newEditors);
    setSelectedJot(updatedEditor);
  };

  const handleJotSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload: IJotState = {
      jots: editors,
      description: description,
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
    <>
      <div className="min-h-[70vh] w-full bg-[#080808] rounded-xl">
        {/* this is the jot editor's container */}
        <form className="flex justify-start items-start flex-col gap-10 p-10">
          {/* jot editor's description */}
          <InputField
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jot Description"
          />

          {/* jot editor's area */}
          {editors.length &&
            editors.map((editor) => (
              <div
                className="w-full flex flex-col gap-3"
                onClick={() => handleSelectEditor(editor.id)}
                key={editor.id}
              >
                <div className="flex justify-start items-center">
                  <div>
                    <InputField
                      name="name"
                      value={
                        selectedJot.id === editor.id
                          ? selectedJot.name
                          : editor.name
                      }
                      placeholder={"Filename with extension."}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* jot editor's text area */}
                <div className="flex min-h-[60vh] w-full bg-[#131313] rounded-xl">
                  <Editor
                    textAreaValue={
                      selectedJot.id === editor.id
                        ? selectedJot.content
                        : editor.content
                    }
                    handleTextChange={handleTextareaChange}
                    readonly={false}
                  />
                </div>
              </div>
            ))}
        </form>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="w-full flex justify-start">
          <Button
            onClick={handleAddEditor}
            width={"20%"}
            imagePath="/public/icons/add_black.svg"
          >
            Add File
          </Button>
        </div>
        <div className="w-full flex justify-end">
          <Button onClick={handleJotSubmit} width={"20%"}>
            Create Jot
          </Button>
        </div>
      </div>
    </>
  );
}
