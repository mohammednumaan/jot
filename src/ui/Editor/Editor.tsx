import { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from "react";

interface EditorProps {
  textAreaValue: string;
  handleTextChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly: boolean;
  initialLineNumber?: number;
}

export default function Editor({
  textAreaValue,
  handleTextChange,
  readonly = false,
  initialLineNumber,
}: EditorProps) {
  const [lineNumbers, setLineNumbers] = useState<number[]>(
    initialLineNumber
      ? Array.from({ length: initialLineNumber }, (_, i) => i + 1)
      : [1]
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current && lineNumbers.length <= 22) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaValue]);

  const syncScroll = () => {
    if (lineNumberRef.current && textAreaRef.current) {
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
      textAreaRef.current.scrollTop = lineNumberRef.current.scrollTop;
    }
  };
  const handleLinNumberChange = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const nextLineNumber = lineNumbers.length + 1;
      setLineNumbers([...lineNumbers, nextLineNumber]);
    } else if (e.key === "Backspace") {
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;

      if (
        cursorPosition > 0 &&
        textarea.value[cursorPosition - 1] === "\n" &&
        lineNumbers.length > 1
      ) {
        const newLineNumbers = [...lineNumbers];
        newLineNumbers.pop();
        setLineNumbers(newLineNumbers);
      }
    }
  };

  return (
    <div className="flex w-full h-full overflow-auto">
      <textarea
        ref={lineNumberRef}
        onScroll={() => syncScroll()}
        id="line-number"
        value={lineNumbers.join("\n")}
        className="w-[6%] text-end font-sans p-4 text-[#543A8B] resize-none focus:outline-0 overflow-hidden"
        readOnly
      />

      <textarea
        ref={textAreaRef}
        onScroll={() => syncScroll()}
        name="content"
        placeholder="Insert Code Snippet..."
        value={textAreaValue}
        onKeyDown={handleLinNumberChange}
        onChange={readonly ? undefined : handleTextChange}
        className="w-full p-4 rounded-xl resize-none focus:outline-0"
        readOnly={readonly}
      ></textarea>
    </div>
  );
}
