import toast from "react-hot-toast";
import useFetch from "../../core/hooks/fetch.hook";
import { AllJotsResponse } from "../../core/types/jot/jots";
import Editor from "../Editor/Editor";
import JotSkeleton from "../Skeleton/Skeleton";
import Pagination from "../Pagination/Pagination";

export default function Discover() {
  const { data, loading, error } = useFetch<AllJotsResponse>("jots/");

  if (error) {
    error.map((err) => toast(err));
  }
  return (
    <div>
      {error && (
        <h1 className="h-[80vh] flex justify-center items-center">
          Could not fetch jots, please try again later.
        </h1>
      )}
      {loading && !error && (
        <div className="flex flex-col gap-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <JotSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center flex-col gap-5">
        {data?.jots.length &&
          data.jots.map((jot) => (
            <div className="flex w-full bg-[#0f0f0f] rounded-xl max-h-[30vh] overflow-auto">
              <Editor
                textAreaValue={jot.content}
                readonly={true}
                initialLineNumber={jot.content.split("\n").length}
              />
            </div>
          ))}
      </div>
      <div className="mt-5 mb-5">
        <Pagination totalPages={20} />
      </div>
    </div>
  );
}
