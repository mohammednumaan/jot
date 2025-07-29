import toast from "react-hot-toast";
import useFetch from "../../core/hooks/fetch.hook";
import { useAuth } from "../../core/context/auth.context";
import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router";
import Button from "../Form/components/Button";
import { AllJotsResponse } from "../../core/types/jot/jots";
import YourJotsContainerSkeleton from "../Skeleton/YourJotsContainerSkeleton";

export default function Profile() {
  const { username } = useAuth();
  const { data, loading, error } = useFetch<AllJotsResponse>(
    `user/${username}/jots`
  );

  if (error) {
    error.map((err) => toast(err));
  }

  if (error) {
    error.map((err) => toast(err));
  }

  return (
    <div>
      <p className="text-2xl text-[#543A8B] underline text-left mb-10">
        All Jots
      </p>
      {error && (
        <h1 className="h-[80vh] flex justify-center items-center">
          Could not fetch jots, please try again later.
        </h1>
      )}

      {/* TODO: refactor this since its the same code as the one in discover with
         some components removed (like the editor component)
      */}
      {!loading && !error && data?.jots.length === 0 && (
        <div className="h-[80vh] mt-[-80px] w-[100%] flex flex-col justify-center items-center gap-5">
          <p className=" text-4xl flex justify-center items-center">
            No Jots found. Start by creating one.
          </p>
          <Link className="w-[57%]" to="/create">
            <Button imagePath="/public/icons/add_black.svg">Create Jot</Button>
          </Link>
        </div>
      )}
      {loading && !error && (
        <div className="flex flex-col gap-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <YourJotsContainerSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center flex-col gap-5">
        {!loading &&
          !error &&
          data?.jots &&
          data.jots.length > 0 &&
          data.jots.map((jot) => (
            <div
              key={jot.id}
              className="flex gap-5 flex-col w-full bg-[#080808] p-4 rounded-md"
            >
              {/* this is the jot's header metadata (name, number of files, etc) */}
              <div className="flex justify-between">
                {/* this is the left side of the header metadata */}
                <div className="flex justify-center items-start flex-col">
                  <div className="flex gap-2">
                    <Link
                      className="hover:underline"
                      to={`/profile/${jot.owner.id}`}
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
                    Updated {formatDistanceToNowStrict(jot.updatedAt)} ago
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
            </div>
          ))}
      </div>

      {/* {loading && !error && data?.pagination && (
        <div className="mt-5 mb-5">
          <Pagination
            page={currentPage}
            totalPages={data.pagination.totalPages}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
            goToPrevPage={goToPrevPage}
          />
        </div>
      )} */}
    </div>
  );
}
