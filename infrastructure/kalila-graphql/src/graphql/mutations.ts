/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBook = /* GraphQL */ `mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    id
    siglum
    title
    author
    authorDeathYear
    media {
      items {
        id
        bookId
        siglum
        format
        pages {
          nextToken
          __typename
        }
        segments {
          nextToken
          __typename
        }
        editor
        version
        __typename
      }
      nextToken
      __typename
    }
    editor
    version
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBookMutationVariables,
  APITypes.CreateBookMutation
>;
export const createMedium = /* GraphQL */ `mutation CreateMedium($input: CreateMediumInput!) {
  createMedium(input: $input) {
    id
    bookId
    siglum
    format
    pages {
      items {
        id
        mediumId
        number
        image
        commentary
        foliation
        pagination
        tags
        images {
          id
          pageId
          legendId
          location
          motifs
          order
          position
          region
          style
          version
          __typename
        }
        text {
          id
          pageId
          order
          position
          region
          version
          __typename
        }
        segments {
          id
          mediumId
          unitId
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          lacuna
          tags
          type
          version
          __typename
        }
        openSegments {
          id
          mediumId
          unitId
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          lacuna
          tags
          type
          version
          __typename
        }
        endingSegments {
          id
          mediumId
          unitId
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          lacuna
          tags
          type
          version
          __typename
        }
        editor
        bodyElements
        marginElements
        imageElements
        lineCount
        tokenCount
        version
        __typename
      }
      nextToken
      __typename
    }
    segments {
      items {
        id
        mediumId
        unitId
        unit {
          bookId
          id
          commentary
          divider
          frame
          motifs
          order
          title
          topics
          variant
          version
          __typename
        }
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        lacuna
        tags
        type
        content {
          id
          tokens
          lines
          pages
          breaks
          regions
          __typename
        }
        version
        __typename
      }
      nextToken
      __typename
    }
    editor
    version
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMediumMutationVariables,
  APITypes.CreateMediumMutation
>;
export const createLineDetectionJob = /* GraphQL */ `mutation CreateLineDetectionJob($input: LineDetectionJobInput!) {
  createLineDetectionJob(input: $input) {
    id
    manuscriptId
    state
    pages
    finishedOn
    parameters
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLineDetectionJobMutationVariables,
  APITypes.CreateLineDetectionJobMutation
>;
export const updatePage = /* GraphQL */ `mutation UpdatePage($update: PageUpdateInput!) {
  updatePage(update: $update)
}
` as GeneratedMutation<
  APITypes.UpdatePageMutationVariables,
  APITypes.UpdatePageMutation
>;
export const updatePageTags = /* GraphQL */ `mutation UpdatePageTags($input: PageTagsInput!) {
  updatePageTags(input: $input)
}
` as GeneratedMutation<
  APITypes.UpdatePageTagsMutationVariables,
  APITypes.UpdatePageTagsMutation
>;
export const createUnit = /* GraphQL */ `mutation CreateUnit($input: CreateUnitInput!) {
  createUnit(input: $input)
}
` as GeneratedMutation<
  APITypes.CreateUnitMutationVariables,
  APITypes.CreateUnitMutation
>;
export const updateUnit = /* GraphQL */ `mutation UpdateUnit($input: UpdateUnitInput!) {
  updateUnit(input: $input)
}
` as GeneratedMutation<
  APITypes.UpdateUnitMutationVariables,
  APITypes.UpdateUnitMutation
>;
export const deleteUnit = /* GraphQL */ `mutation DeleteUnit($input: DeleteUnitInput!) {
  deleteUnit(input: $input)
}
` as GeneratedMutation<
  APITypes.DeleteUnitMutationVariables,
  APITypes.DeleteUnitMutation
>;
export const changeMediumEditor = /* GraphQL */ `mutation ChangeMediumEditor($mediumId: ID!, $editor: String!) {
  changeMediumEditor(mediumId: $mediumId, editor: $editor)
}
` as GeneratedMutation<
  APITypes.ChangeMediumEditorMutationVariables,
  APITypes.ChangeMediumEditorMutation
>;
export const editMultiplePages = /* GraphQL */ `mutation EditMultiplePages($update: [PageUpdateTargetInput!]!) {
  editMultiplePages(update: $update)
}
` as GeneratedMutation<
  APITypes.EditMultiplePagesMutationVariables,
  APITypes.EditMultiplePagesMutation
>;
