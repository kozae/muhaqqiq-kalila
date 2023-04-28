import JSONUpload from "./JSONUpload";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { CreateSegmentMutation, CreateSegmentInput } from "aws-backend";
import UnitOldToNewIdMap from "./UnitOldToNewIdMap";
import { useState } from "react";

export const createSegment = /* GraphQL */ `
  mutation CreateSegment(
    $input: CreateSegmentInput!
    $condition: ModelSegmentConditionInput
  ) {
    createSegment(input: $input, condition: $condition) {
      id
    }
  }
`;

export default function SegmentUpload() {
  const [progress, setProgress] = useState(0);
  const handleJSONUpload = async (json: any[]) => {
    for (const [index, doc] of json.entries()) {
      const item: CreateSegmentInput = {
        mediumID: "7ea9cf0e-2344-4147-a77a-29825b600f0e",
        unitID: UnitOldToNewIdMap[doc.BookUnitId.$oid as string] as string,
        type: doc.Type,
        lacuna: doc.Lacuna,
        startPage: doc.Start[0],
        startLine: doc.Start[1],
        startToken: doc.Start[2],
        endPage: doc.End[0],
        endLine: doc.End[1],
        endToken: doc.End[2],
      };
      console.log({ item });
      await API.graphql<GraphQLQuery<CreateSegmentMutation>>({
        query: createSegment,
        variables: { input: item },
      });
      const currentProgress = ((index + 1) / json.length) * 100;
      setProgress(currentProgress);
    }
    alert(`${json.length} items inserted`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl">Segments</h1>
      <JSONUpload onUpload={handleJSONUpload} text="upload Segments" />
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
