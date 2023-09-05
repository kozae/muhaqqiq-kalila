import Display from "@components/Display";
import { useState } from "react";
import Edit from "@components/Edit";

export default function Panel() {
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <>
      {mode === "view" ? (
        <Display onEdit={() => setMode("edit")} />
      ) : (
        <Edit initialValues={{}} onFinished={() => setMode("view")} />
      )}
    </>
  );
}
