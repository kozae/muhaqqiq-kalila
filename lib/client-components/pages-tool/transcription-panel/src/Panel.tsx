import CommandBar from "@components/CommandBar";
import Editor from "@components/Editor";
import ErrorDisplay from "@components/ErrorDisplay";
export function Panel() {
  return (
    <>
      <CommandBar />
      <div className="flex h-[calc(100vh-150px)] flex-col bg-red-50">
        <Editor />
        <ErrorDisplay />
      </div>
    </>
  );
}
