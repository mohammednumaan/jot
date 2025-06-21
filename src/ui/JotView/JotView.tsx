import { useParams } from "react-router";
import useFetch from "../../core/hooks/fetch.hook";
import { GetJotGroupResponse } from "../../core/types/jot/get_jotGroup.types";
import toast from "react-hot-toast";
import Editor from "../Editor/Editor";
import { useAuth } from "../../core/context/auth.context";
import Button from "../Form/components/Button";
import { MouseEvent, useState } from "react";
import JotEditor from "../JotEditor/JotEditor";
import mapToEditorState from "../../core/utils/map_to_editor_state.utils";
import {
  IEditorState,
  IJotPayload,
} from "../../core/types/jot/create_jot.types";
import { apiPostRequest } from "../../core/utils/request.utils";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../core/types/api/response";
import { asyncResponseErrorHandler } from "../../core/errors/errors";
import JotContainerSkeleton from "../Skeleton/JotContainerSkeleton";

export default function JotView() {
  const { username } = useAuth();
  const { name, jotGroupId } = useParams();
  const { data, loading, error, setRefetch } = useFetch<GetJotGroupResponse>(
    `user/${name}/${jotGroupId}`
  );

  const [editable, setEditable] = useState(false);
  const jots = data?.jots;

  if (error) {
    error.map((err) => toast(err));
  }

  // this maps the fetched jots to EditorState type objects
  // which is neccessary for the editor component
  let editors: IEditorState[] = [];
  let description = data?.description || "";
  if (data?.jots) {
    editors = mapToEditorState(data);
  }

  const handleJotEditSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
    editors: IEditorState[],
    description: string
  ) => {
    const payload: IJotPayload = {
      jots: editors,
      description: description,
    };

    e.preventDefault();
    const response = await apiPostRequest<
      IJotPayload,
      ApiErrorResponse | ApiSucessResponse<IJotPayload>
    >(`jots/edit/${jotGroupId}`, payload, "PUT");

    if (!response.success) {
      const errors = asyncResponseErrorHandler(response);
      for (const err of errors) {
        toast(err);
      }
    } else {
      toast.success("Jot updated successfully.");
      setRefetch(true);
      setEditable(false);
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast("Copied contents to clipboard.");
    } catch (err) {
      toast("An error occured copying the contents to the clipboard.");
    }
  };

  return (
    <div>
      {loading && !error && (
        <div className="flex flex-col gap-10">
          {Array.from({ length: data?.jots.length || 5 }).map((_, index) => (
            <JotContainerSkeleton key={index} />
          ))}
        </div>
      )}
      {username === name && !loading && !error && (
        // this div contains options for the owner to edit/edit the jot
        <div className=" flex justify-end items-center gap-2 mb-5">
          {!editable ? (
            <>
              <Button
                width="90%"
                imagePath="/public/icons/edit_icon.svg"
                onClick={() => setEditable(true)}
              >
                Edit
              </Button>
              <Button width="90%" imagePath="/public/icons/delete_icon.svg">
                Delete
              </Button>
            </>
          ) : (
            <Button
              width="90%"
              onClick={() => setEditable(false)}
              imagePath="/public/icons/cancel_edit.svg"
            >
              Cancel
            </Button>
          )}
        </div>
      )}
      {/* this is the jot filename header along with the content */}
      <div className="flex flex-col gap-10">
        {!editable &&
          !loading &&
          !error &&
          jots?.length &&
          jots.length > 0 &&
          jots.map((jot, index) => (
            <div>
              <div
                key={index}
                className="min-h-[5vh] w-full flex justify-between items-center p-3 bg-[#080808] rounded-tr-md rounded-tl-md"
              >
                <div className="flex gap-2">
                  <img
                    src={"/public/icons/code_block.svg"}
                    alt="code block icon"
                  />
                  <p>{jot.name + "." + jot.extension}</p>
                </div>
                <button
                  onClick={() => handleCopy(jot.content)}
                  className="bg-[#1b1b1b] hover:text-black hover:bg-[#e9dcf8] transition duration-500 ease-in-out rounded-2xl text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="flex w-full rounded-br-md rounded-bl-md  bg-[#0f0f0f] max-h-[30vh] overflow-auto">
                <Editor
                  textAreaValue={jot.content}
                  readonly={true}
                  initialLineNumber={jot.content.split("\n").length}
                />
              </div>
            </div>
          ))}
        {editable && (
          <JotEditor
            handleSubmit={handleJotEditSubmit}
            existingEditorState={editors}
            existingDescriptionState={description}
            usedFor="edit"
          />
        )}
      </div>
    </div>
  );
}
