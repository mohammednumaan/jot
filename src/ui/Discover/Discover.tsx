import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router";
import Button from "../Form/components/Button";
import JotContainerSkeleton from "../Skeleton/JotContainerSkeleton";
import { AllJotsResponse } from "../../core/types/jot/jots";
import useFetch from "../../core/hooks/fetch.hook";
import toast from "react-hot-toast";
import Editor from "../Editor/Editor";
import Pagination from "../Pagination/Pagination";

export default function Discover() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetch<AllJotsResponse>(
    `jots?page=${currentPage}`
  );

  if (error) {
    error.map((err) => toast(err));
  }

  const goToNextPage = (page: number) => {
    if (currentPage === data?.pagination.totalPages) {
      return;
    }
    setCurrentPage(page + 1);
  };

  const goToPrevPage = (page: number) => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(page - 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {error && (
        <h1 className="h-[80vh] flex justify-center items-center">
          Could not fetch jots, please try again later.
        </h1>
      )}
      {loading && !error && (
        <div className="flex flex-col gap-10">
          {Array.from({ length: 2 }).map((_, index) => (
            <JotContainerSkeleton key={index} />
          ))}
        </div>
      )}

      {data?.jots.length === 0 && (
        <div className="h-[80vh] w-[100%] flex flex-col justify-center items-center gap-5">
          <p className=" text-4xl flex justify-center items-center">
            No Jots found. Start by creating one.
          </p>
          <Link className="w-[57%]" to="/create">
            <Button imagePath="/public/icons/add_black.svg">Create Jot</Button>
          </Link>
        </div>
      )}
      <div className="flex justify-center items-center flex-col gap-5">
        {!loading &&
          !error &&
          data?.jots &&
          data.jots.length > 0 &&
          data.jots.map((jot) => (
            <div key={jot.id} className="flex gap-5 flex-col w-full">
              {/* this is the jot's header metadata (name, number of files, etc) */}
              <div className="flex justify-between">
                {/* this is the left side of the header metadata */}
                <div className="flex justify-center items-start flex-col">
                  <div className="flex gap-2">
                    <Link
                      className="hover:underline"
                      to={`/profile/${jot.owner.name}`}
                    >
                      <p className="text-xl text-[#543A8B]">{jot.owner.name}</p>
                    </Link>
                    <p className="text-xl text-[#543A8B]">/</p>
                    <Link
                      className="hover:underline"
                      to={`/${jot.owner.name}/${jot.jotGroup.id}`}
                    >
                      <p className="text-xl text-[#543A8B]">
                        {jot.name + "." + jot.extension}
                      </p>
                    </Link>
                  </div>
                  <p className="text-sm opacity-[0.6]">
                    Created {formatDistanceToNowStrict(jot.jotGroup.createdAt)}{" "}
                    ago
                  </p>
                  <p className="text-sm opacity-[0.6]">
                    {jot.jotGroup.description}
                  </p>
                </div>

                {/* this is the right side of the header metadata */}
                <div>
                  <div className="flex gap-2">
                    <img
                      src={"/public/icons/code_block.svg"}
                      alt="code block icon"
                    />
                    <p className="text-sm opacity-[0.6]">
                      {jot.jotGroup.totalFiles} file
                      {jot.jotGroup.totalFiles > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* this is the retrieved jot's content */}
              <div className="flex w-full bg-[#0f0f0f] rounded-xl max-h-[30vh] overflow-auto">
                <Editor
                  textAreaValue={jot.content}
                  readonly={true}
                  initialLineNumber={jot.content.split("\n").length}
                />
              </div>
            </div>
          ))}
      </div>
      {!loading && !error && data?.jots && data.jots.length > 0 && (
        <div className="mt-5 mb-5">
          <Pagination
            page={currentPage}
            totalPages={data.pagination.totalPages}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            goToPrevPage={goToPrevPage}
          />
        </div>
      )}
    </div>
  );
}
