/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook($input: CreateBookInput!) {
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
`;
export const createMedium = /* GraphQL */ `
  mutation CreateMedium($input: CreateMediumInput!) {
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
export const createLineDetectionJob = /* GraphQL */ `
  mutation CreateLineDetectionJob($input: LineDetectionJobInput!) {
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
`;
export const updatePageInfo = /* GraphQL */ `
  mutation UpdatePageInfo($id: ID!, $input: PageInfoUpdateInput!) {
    updatePageInfo(id: $id, input: $input) {
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
        legend {
          id
          pageId
          order
          position
          region
          lines {
            id
            elementId
            order
            region
            states
            tokens
            version
            __typename
          }
          version
          __typename
        }
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
        lines {
          id
          elementId
          order
          region
          states
          tokens
          version
          __typename
        }
        version
        __typename
      }
      segments {
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
      openSegments {
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
      endingSegments {
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
      editor
      version
      __typename
    }
  }
`;
export const createUnit = /* GraphQL */ `
  mutation CreateUnit($input: CreateUnitInput!) {
    createUnit(input: $input)
  }
`;
export const updateUnit = /* GraphQL */ `
  mutation UpdateUnit($input: UpdateUnitInput!) {
    updateUnit(input: $input)
  }
`;
export const deleteUnit = /* GraphQL */ `
  mutation DeleteUnit($input: DeleteUnitInput!) {
    deleteUnit(input: $input)
  }
`;
