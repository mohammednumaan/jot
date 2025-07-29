import { MouseEvent } from "react";
import {
  IEditorState,
  IJotPayload,
} from "../../core/types/jot/create_jot.types";
import { apiPutOrPostRequest } from "../../core/utils/request.utils";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../core/types/api/response";
import { asyncResponseErrorHandler } from "../../core/errors/errors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import JotEditor from "../JotEditor/JotEditor";

export default function CreateJot() {
  const navigate = useNavigate();
  const handleJotSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
    editors: IEditorState[],
    description: string,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setDisabled(true)
    console.log("diabled is false")
    const payload: IJotPayload = {
      jots: editors,
      description: description,
    };

    const response = await apiPutOrPostRequest<
      IJotPayload,
      ApiErrorResponse | ApiSucessResponse<IJotPayload>
    >("jots/", payload);

    if (!response.success) {
      const errors = asyncResponseErrorHandler(response);
      setDisabled(false)
      for (const err of errors) {
        toast(err);
      }
    } else {
      toast.success(
        "Jot created successfully, Redirecting to Discover Page..."
      );
      setTimeout(() => {
        navigate("/discover");
      }, 1500);
    }
  };

  return <JotEditor handleSubmit={handleJotSubmit} usedFor="create" />;
}
