import JSONUpload from "./JSONUpload";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { CreateUnitMutation, CreateUnitInput } from "aws-backend";
import { ImportDto, transformUnits } from "./helpers/transformUnits";
import { useState } from "react";

export const createUnit = /* GraphQL */ `
  mutation CreateUnit(
    $input: CreateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    createUnit(input: $input, condition: $condition) {
      id
    }
  }
`;

function downloadMapAsJson(
  map: Record<string, string>,
  fileName: string
): void {
  const data = JSON.stringify(map, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

export default function BookUnitUpload() {
  const [progress, setProgress] = useState(0);
  const handleJSONUpload = async (json: ImportDto[]) => {
    const [transformed, map] = transformUnits(
      json,
      "f93e27ee-4805-4e6e-ba2b-ff97692048e2"
    );
    downloadMapAsJson(map, "map.json");

    for (const [index, doc] of transformed.entries()) {
      const item: CreateUnitInput = {
        bookUnitsId: "f93e27ee-4805-4e6e-ba2b-ff97692048e2",
        id: doc.Id,
        parentID: doc.ParentId,
        title: doc.Title as string,
        order: doc.Order as number,
        frame: doc.Frame,
        divider: doc.Divider,
      };
      await API.graphql<GraphQLQuery<CreateUnitMutation>>({
        query: createUnit,
        variables: { input: item },
      });
      console.log({ item });
      const currentProgress = ((index + 1) / transformed.length) * 100;
      setProgress(currentProgress);
    }
    alert(`${json.length} items inserted`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl">Book Unit</h1>
      <JSONUpload onUpload={handleJSONUpload} text="upload book units" />
      <div className="mt-4 w-full">
        <div
          className="bg-blue-500"
          style={{ height: "10px", width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2">
        {progress > 0 && progress < 100
          ? `Uploading: ${progress.toFixed(1)}%`
          : ""}
      </p>
    </div>
  );
}
