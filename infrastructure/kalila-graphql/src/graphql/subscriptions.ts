/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
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
`;
export const onCreateMedium = /* GraphQL */ `
  subscription OnCreateMedium($bookId: String!) {
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
`;
