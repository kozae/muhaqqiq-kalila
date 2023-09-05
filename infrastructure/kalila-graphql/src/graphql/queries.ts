/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItemCount = /* GraphQL */ `
  query GetItemCount($table: Sources!) {
    getItemCount(table: $table) {
      table
      count
      __typename
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
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
export const listBooks = /* GraphQL */ `
  query ListBooks {
    listBooks {
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
export const getMedium = /* GraphQL */ `
  query GetMedium($id: ID!) {
    getMedium(id: $id) {
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
export const listBookMedia = /* GraphQL */ `
  query ListBookMedia(
    $id: ID!
    $limit: Int
    $nextToken: String
    $sort: SortDirection
  ) {
    listBookMedia(id: $id, limit: $limit, nextToken: $nextToken, sort: $sort) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
      bookId
      id
      parentId
      commentary
      divider
      frame
      motifs
      order
      title
      topics
      variant
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
      children {
        items {
          bookId
          id
          parentId
          commentary
          divider
          frame
          motifs
          order
          title
          topics
          variant
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
          children {
            nextToken
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
          version
          __typename
        }
        nextToken
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
      version
      __typename
    }
  }
`;
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $parentId: ID!
    $limit: Int
    $orderGt: Int
    $orderLt: Int
    $nextToken: String
    $sort: SortDirection
  ) {
    listUnits(
      parentId: $parentId
      limit: $limit
      orderGt: $orderGt
      orderLt: $orderLt
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        bookId
        id
        parentId
        commentary
        divider
        frame
        motifs
        order
        title
        topics
        variant
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
        children {
          items {
            bookId
            id
            parentId
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
          nextToken
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
        version
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
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
      editor
      version
      __typename
    }
  }
`;
export const listMediumPages = /* GraphQL */ `
  query ListMediumPages(
    $id: ID!
    $limit: Int
    $numberGt: Int
    $numberLt: Int
    $nextToken: String
    $sort: SortDirection
  ) {
    listMediumPages(
      id: $id
      limit: $limit
      numberGt: $numberGt
      numberLt: $numberLt
      nextToken: $nextToken
      sort: $sort
    ) {
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
          legend {
            id
            pageId
            order
            position
            region
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
        editor
        version
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSegment = /* GraphQL */ `
  query GetSegment($id: ID!) {
    getSegment(id: $id) {
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
  }
`;
export const listMediumSegments = /* GraphQL */ `
  query ListMediumSegments(
    $id: ID!
    $limit: Int
    $startPageGt: Int
    $startPageLt: Int
    $nextToken: String
    $sort: SortDirection
  ) {
    listMediumSegments(
      id: $id
      limit: $limit
      startPageGt: $startPageGt
      startPageLt: $startPageLt
      nextToken: $nextToken
      sort: $sort
    ) {
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
  }
`;
export const getChapterCollation = /* GraphQL */ `
  query GetChapterCollation($id: ID!) {
    getChapterCollation(id: $id) {
      id
      chapter
      name
      mediumIds
      editor
      version
      __typename
    }
  }
`;
export const listChapterCollations = /* GraphQL */ `
  query ListChapterCollations {
    listChapterCollations {
      id
      chapter
      name
      mediumIds
      editor
      version
      __typename
    }
  }
`;
export const listLineDetectionJobs = /* GraphQL */ `
  query ListLineDetectionJobs {
    listLineDetectionJobs {
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
export const getLineDetectionJob = /* GraphQL */ `
  query GetLineDetectionJob($manuscriptId: ID!, $state: Int!) {
    getLineDetectionJob(manuscriptId: $manuscriptId, state: $state) {
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
