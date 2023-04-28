// JSONUploader.tsx
import React, { useState } from "react";

type IJSONUploadProps = {
  text: string;
  onUpload: (json: any) => void;
};

export default function JSONUpload({ onUpload, text }: IJSONUploadProps) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        onUpload(json);
        setFileName(file.name);
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="bg-primary-500 cursor-pointer rounded px-4 py-2 font-bold text-white">
        {text}
        <input
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
      </label>
      {fileName && <p className="mt-2 text-sm">Uploaded: {fileName}</p>}
    </div>
  );
}
