/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBook = /* GraphQL */ `subscription OnCreateBook {
  onCreateBook {
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
` as GeneratedSubscription<
  APITypes.OnCreateBookSubscriptionVariables,
  APITypes.OnCreateBookSubscription
>;
export const onCreateMedium = /* GraphQL */ `subscription OnCreateMedium($bookId: String!) {
  onCreateMedium(bookId: $bookId) {
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
          unitId
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
          tokens
          lines
          pages
          breaks
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
` as GeneratedSubscription<
  APITypes.OnCreateMediumSubscriptionVariables,
  APITypes.OnCreateMediumSubscription
>;
