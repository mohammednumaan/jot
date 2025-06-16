import toast from "react-hot-toast";
import useFetch from "../../core/hooks/fetch.hook";
import { IProfileJots } from "../../core/types/jot/jotGroup.types";
import { useAuth } from "../../core/context/auth.context";
import { formatDistanceToNowStrict } from "date-fns";

export default function Profile() {
  const { username } = useAuth();
  const { data, loading, error } = useFetch<IProfileJots>(
    `user/${username}/jots`
  );

  if (error) {
    error.map((err) => toast(err));
  }

  return (
    <div>
      {/* this is the user's jots list */}
      <div>
        <p className="text-2xl text-[#543A8B] font-bold mb-5">All Jots</p>
        <div className="flex flex-col gap-10">
          {data?.jots &&
            data.jots.length > 0 &&
            data.jots.map((jot) => (
              <div className="w-full flex flex-col p-5 bg-[#080808] rounded-tr-md rounded-tl-md">
                <div className="flex justify-between items-center">
                  {/* this is the right header for the jot which contains the jot's 
                        description and the updated date 
                  */}
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-[#543A8B]">{jot.description}</p>
                    <p className="text-sm opacity-[0.6]">
                      Updated {formatDistanceToNowStrict(jot.updatedAt)} ago
                    </p>
                  </div>

                  {/* this is the left header of the jot which contains the number of files it contains */}
                  <div className="flex gap-2">
                    <img
                      src={"/public/icons/code_block.svg"}
                      alt="code block icon"
                    />
                    <p className="text-sm opacity-[0.6]">
                      {jot.totalFiles} file
                      {jot.totalFiles > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
