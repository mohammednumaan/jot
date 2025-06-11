import { useParams } from "react-router";
import useFetch from "../../core/hooks/fetch.hook";
import { GetJotGroupResponse } from "../../core/types/jot/get_jotGroup.types";
import toast from "react-hot-toast";
import Editor from "../Editor/Editor";

export default function JotView() {
  const { name, jotGroupId } = useParams();
  const { data, loading, error } = useFetch<GetJotGroupResponse>(
    `user/${name}/${jotGroupId}`
  );

  const jots = data?.jots;

  if (error) {
    error.map((err) => toast(err));
  }

  const handleCopy = async (content: string) => {
    try {
      console.log(content);

      await navigator.clipboard.writeText(content);
      toast("Copied contents to clipboard.")
    } catch (err) {
      toast("An error occured copying the contents to the clipboard.");
    }
  };

  return (
    <div>
      {/* this is the jot filename header along with the content */}
      <div className="flex flex-col gap-10">
        {jots?.length &&
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
      </div>
    </div>
  );
}
