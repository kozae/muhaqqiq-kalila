import JSONUpload from "./JSONUpload";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateMediumMutation,
  CreateMediumInput,
  MediaFormat,
} from "aws-backend";

export const createMedium = /* GraphQL */ `
  mutation CreateMedium(
    $input: CreateMediumInput!
    $condition: ModelMediumConditionInput
  ) {
    createMedium(input: $input, condition: $condition) {
      id
    }
  }
`;

export default function MediaUpload() {
  const handleJSONUpload = async (json: any[]) => {
    for (const doc of json) {
      const item: CreateMediumInput = {
        bookMediaId: "f93e27ee-4805-4e6e-ba2b-ff97692048e2",
        siglum: doc.Siglum,
        format: MediaFormat.MANUSCRIPT,
        editor: "mk",
      };
      await API.graphql<GraphQLQuery<CreateMediumMutation>>({
        query: createMedium,
        variables: { input: item },
      });
    }
    alert(`${json.length} items inserted`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl">Medium</h1>
      <JSONUpload onUpload={handleJSONUpload} text="upload medium data" />
    </div>
  );
}
