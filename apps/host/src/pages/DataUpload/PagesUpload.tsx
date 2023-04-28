import JSONUpload from "./JSONUpload";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreatePageMutation,
  CreatePageInput,
  CreateTextElementMutation,
  CreateTextElementInput,
  CreateImageElementMutation,
  CreateImageElementInput,
  CreateLineMutation,
  CreateLineInput,
} from "aws-backend";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { chain } from "lodash";

export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createTextElement = /* GraphQL */ `
  mutation CreateTextElement(
    $input: CreateTextElementInput!
    $condition: ModelTextElementConditionInput
  ) {
    createTextElement(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createImageElement = /* GraphQL */ `
  mutation CreateImageElement(
    $input: CreateImageElementInput!
    $condition: ModelImageElementConditionInput
  ) {
    createImageElement(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createLine = /* GraphQL */ `
  mutation CreateLine(
    $input: CreateLineInput!
    $condition: ModelLineConditionInput
  ) {
    createLine(input: $input, condition: $condition) {
      id
    }
  }
`;

const mediumID = "7ea9cf0e-2344-4147-a77a-29825b600f0e";

export default function PagesUpload() {
  const [progress, setProgress] = useState(0);
  const handleJSONUpload = async (json: any[]) => {
    for (const [index, doc] of json.entries()) {
      const pageID = uuidv4();
      const pageInput: CreatePageInput = {
        mediumID,
        id: pageID,
        number: doc.Number,
        image: doc.FacsimileImageUrl,
        tags: doc.Tags,
        pagination: doc.Pagination,
        foliation: doc.Foliation,
      };
      await API.graphql<GraphQLQuery<CreatePageMutation>>({
        query: createPage,
        variables: { input: pageInput },
      });

      for (const element of doc.TextElements) {
        const elementID = uuidv4();
        const elementInput: CreateTextElementInput = {
          pageID,
          id: elementID,
          order: element.Order,
          position: element.Position,
          region: element.FacsimileRegion,
        };
        await API.graphql<GraphQLQuery<CreateTextElementMutation>>({
          query: createTextElement,
          variables: { input: elementInput },
        });

        for (const line of element.Lines) {
          const lineId = uuidv4();
          const lineInput: CreateLineInput = {
            elementID,
            id: lineId,
            order: line.LineOrder,
            region: line.FacsimileRegion,
            tokens: chain(line.Tokens)
              .sortBy("OrderInLine")
              .map((t) => t.RawToken)
              .value(),
            states: chain(line.Tokens)
              .sortBy("OrderInLine")
              .map((t) => t.State)
              .value(),
          };
          await API.graphql<GraphQLQuery<CreateLineMutation>>({
            query: createLine,
            variables: { input: lineInput },
          });
        }
      }

      for (const element of doc.ImageElements) {
        const elementID = uuidv4();
        const imageElementInput: CreateImageElementInput = {
          pageID,
          id: elementID,
          order: element.Order,
          position: element.Position,
          region: element.FacsimileRegion,
          location: element.Location,
        };
        await API.graphql<GraphQLQuery<CreateImageElementMutation>>({
          query: createImageElement,
          variables: { input: imageElementInput },
        });
      }

      const currentProgress = ((index + 1) / json.length) * 100;
      setProgress(currentProgress);
    }
    alert(`${json.length} items inserted`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl">Pages</h1>
      <JSONUpload onUpload={handleJSONUpload} text="upload pages" />
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
