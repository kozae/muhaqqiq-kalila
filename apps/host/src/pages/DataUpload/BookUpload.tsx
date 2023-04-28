import JSONUpload from "./JSONUpload";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { CreateBookMutation, CreateBookInput } from "aws-backend";

const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
      id
    }
  }
`;

export default function BookUpload() {
  const handleJSONUpload = async (json: any[]) => {
    for (const doc of json) {
      const item: CreateBookInput = {
        siglum: doc.Siglum,
        title: doc.Title,
        author: doc.Author,
        authorDeathYear: doc.AuthorDeathYear,
      };
      await API.graphql<GraphQLQuery<CreateBookMutation>>({
        query: createBook,
        variables: { input: item },
      });
    }
    alert(`${json.length} items inserted`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl">Book</h1>
      <JSONUpload onUpload={handleJSONUpload} text="upload book data" />
    </div>
  );
}
