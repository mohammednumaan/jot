import { Link, useNavigate, useParams } from "react-router";
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
  IJotUpdatePayload,
} from "../../core/types/jot/create_jot.types";
import {
  apiDeleteRequest,
  apiPutOrPostRequest,
} from "../../core/utils/request.utils";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../core/types/api/response";
import { asyncResponseErrorHandler } from "../../core/errors/errors";
import JotViewContainerSkeleton from "../Skeleton/JotViewContainerSkeleton";
import { formatDistanceToNowStrict } from "date-fns";

export default function JotView() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
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
  let description = data?.jotGroup.description || "";
  if (data?.jots) {
    editors = mapToEditorState(data);
  }

  const handleJotEditSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
    editors: IEditorState[],
    description: string,
    disableEditorButtons: React.Dispatch<React.SetStateAction<boolean>>,
    deleted?: string[],
  ) => {
    setRefetch(false)
    const payload: IJotUpdatePayload = {
      jots: editors,
      description: description,
      deleted: deleted || [],
    };

    e.preventDefault();
    const response = await apiPutOrPostRequest<
      IJotPayload,
      ApiErrorResponse | ApiSucessResponse<IJotPayload>
    >(`jots/${jotGroupId}`, payload, "PUT");

    disableEditorButtons(true);
    if (!response.success) {
      disableEditorButtons(false);

      const errors = asyncResponseErrorHandler(response);
      for (const err of errors) {
        toast(err);
      }
    } else {
      toast.success("Jot updated successfully.");
      setTimeout(() => {
        setEditable(false);
        setRefetch(true);
      }, 2000);
    }
  };

  const handleDeleteJot = async () => {
    setDisabled(true);
    const response = await apiDeleteRequest<
      ApiErrorResponse | ApiSucessResponse<null>
    >(`jots/${jotGroupId}`);
    if (response) {
      toast("Deleted Jot Successfully, Redirecting to discover page...");

      setTimeout(() => navigate("/discover"), 1000);
    } else {
      toast("Something went wrong");
      setDisabled(false);
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
            <JotViewContainerSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && !error && jots?.length && jots.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-start flex-col mb-5">
            <div className="flex gap-2">
              <Link
                className="hover:underline"
                to={`/profile/${data?.owner.name}`}
              >
                <p className="text-xl text-[#543A8B]">{data?.owner.name}</p>
              </Link>
              <p className="text-xl text-[#543A8B]">/</p>
              <Link
                className="hover:underline"
                to={`/${data?.owner.name}/${data?.jotGroup.id}`}
              >
                <p className="text-xl text-[#543A8B]">
                  {jots[0].name + "." + jots[0].extension}
                </p>
              </Link>
            </div>
            <p className="text-sm opacity-[0.6]">
              Created {formatDistanceToNowStrict(jots[0].createdAt)} ago
            </p>
            <p className="text-sm opacity-[0.6]">
              {data?.jotGroup.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {editable && (
              <>
                <p className="text-sm opacity-[0.6]">Editing Jot</p>
                <div className="relative">
                  <span className="relative flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#543A8B] opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-[#543A8B]"></span>
                  </span>
                </div>
              </>
            )}
          </div>
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
                <div className="flex items-center gap-2">
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
            setEditable={setEditable}
          />
        )}
      </div>
      {username === name && !loading && !error && (
        // this div contains options for the owner to edit/edit the jot
        <div className=" flex justify-end items-center gap-2 mt-5">
          {!editable && (
            <>
              <Button
                disabled={disabled}
                width="10%"
                imagePath="/public/icons/edit_icon.svg"
                onClick={() => setEditable(true)}
              >
                Edit
              </Button>
              <Button
                disabled={disabled}
                onClick={handleDeleteJot}
                width="10%"
                imagePath="/public/icons/delete_icon.svg"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
