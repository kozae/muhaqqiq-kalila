/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      editor
      siglum
      title
      author
      authorDeathYear
      media {
        items {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        nextToken
      }
      units {
        items {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $id: ID
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBooks(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        editor
        siglum
        title
        author
        authorDeathYear
        media {
          items {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          nextToken
        }
        units {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const booksBySiglum = /* GraphQL */ `
  query BooksBySiglum(
    $siglum: String!
    $sortDirection: ModelSortDirection
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    booksBySiglum(
      siglum: $siglum
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        editor
        siglum
        title
        author
        authorDeathYear
        media {
          items {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          nextToken
        }
        units {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
      id
      parentID
      parent {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      title
      order
      frame
      variant
      divider
      commentary
      motifs
      topics
      children {
        items {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        nextToken
      }
      segments {
        items {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          unitID
          unit {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          lacuna
          type
          tags
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          createdAt
          updatedAt
        }
        nextToken
      }
      images {
        items {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          unitID
          unit {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          order
          position
          region
          location
          motifs
          style
          legend {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          imageElementLegendId
        }
        nextToken
      }
      createdAt
      updatedAt
      bookUnitsId
    }
  }
`;
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $id: ID
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUnits(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      nextToken
    }
  }
`;
export const unitsByParentID = /* GraphQL */ `
  query UnitsByParentID(
    $parentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unitsByParentID(
      parentID: $parentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      nextToken
    }
  }
`;
export const unitsByFrame = /* GraphQL */ `
  query UnitsByFrame(
    $frame: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unitsByFrame(
      frame: $frame
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      nextToken
    }
  }
`;
export const getMedium = /* GraphQL */ `
  query GetMedium($id: ID!) {
    getMedium(id: $id) {
      id
      editor
      siglum
      format
      pages {
        items {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      segments {
        items {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          unitID
          unit {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          lacuna
          type
          tags
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      bookMediaId
      chapterCollationMediaId
    }
  }
`;
export const listMediums = /* GraphQL */ `
  query ListMediums(
    $id: ID
    $filter: ModelMediumFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMediums(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        editor
        siglum
        format
        pages {
          items {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        bookMediaId
        chapterCollationMediaId
      }
      nextToken
    }
  }
`;
export const mediumsBySiglum = /* GraphQL */ `
  query MediumsBySiglum(
    $siglum: String!
    $sortDirection: ModelSortDirection
    $filter: ModelMediumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediumsBySiglum(
      siglum: $siglum
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        editor
        siglum
        format
        pages {
          items {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        bookMediaId
        chapterCollationMediaId
      }
      nextToken
    }
  }
`;
export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
      id
      mediumID
      medium {
        id
        editor
        siglum
        format
        pages {
          items {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        bookMediaId
        chapterCollationMediaId
      }
      number
      pagination
      foliation
      tags
      image
      commentary
      text {
        items {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          order
          position
          region
          lines {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      images {
        items {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          unitID
          unit {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          order
          position
          region
          location
          motifs
          style
          legend {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          imageElementLegendId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPages = /* GraphQL */ `
  query ListPages(
    $id: ID
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPages(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        number
        pagination
        foliation
        tags
        image
        commentary
        text {
          items {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const pagesByMediumID = /* GraphQL */ `
  query PagesByMediumID(
    $mediumID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pagesByMediumID(
      mediumID: $mediumID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        number
        pagination
        foliation
        tags
        image
        commentary
        text {
          items {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const pagesByNumber = /* GraphQL */ `
  query PagesByNumber(
    $number: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pagesByNumber(
      number: $number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        number
        pagination
        foliation
        tags
        image
        commentary
        text {
          items {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTextElement = /* GraphQL */ `
  query GetTextElement($id: ID!) {
    getTextElement(id: $id) {
      id
      pageID
      page {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        number
        pagination
        foliation
        tags
        image
        commentary
        text {
          items {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      order
      position
      region
      lines {
        items {
          id
          elementID
          order
          region
          tokens
          states
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTextElements = /* GraphQL */ `
  query ListTextElements(
    $id: ID
    $filter: ModelTextElementFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTextElements(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        order
        position
        region
        lines {
          items {
            id
            elementID
            order
            region
            tokens
            states
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const textElementsByPageID = /* GraphQL */ `
  query TextElementsByPageID(
    $pageID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTextElementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textElementsByPageID(
      pageID: $pageID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        order
        position
        region
        lines {
          items {
            id
            elementID
            order
            region
            tokens
            states
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLine = /* GraphQL */ `
  query GetLine($id: ID!) {
    getLine(id: $id) {
      id
      elementID
      order
      region
      tokens
      states
      createdAt
      updatedAt
    }
  }
`;
export const listLines = /* GraphQL */ `
  query ListLines(
    $id: ID
    $filter: ModelLineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLines(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        elementID
        order
        region
        tokens
        states
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const linesByElementID = /* GraphQL */ `
  query LinesByElementID(
    $elementID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    linesByElementID(
      elementID: $elementID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        elementID
        order
        region
        tokens
        states
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImageElement = /* GraphQL */ `
  query GetImageElement($id: ID!) {
    getImageElement(id: $id) {
      id
      pageID
      page {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        number
        pagination
        foliation
        tags
        image
        commentary
        text {
          items {
            id
            pageID
            order
            position
            region
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      unitID
      unit {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      order
      position
      region
      location
      motifs
      style
      legend {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        order
        position
        region
        lines {
          items {
            id
            elementID
            order
            region
            tokens
            states
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      imageElementLegendId
    }
  }
`;
export const listImageElements = /* GraphQL */ `
  query ListImageElements(
    $id: ID
    $filter: ModelImageElementFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listImageElements(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        order
        position
        region
        location
        motifs
        style
        legend {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          order
          position
          region
          lines {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        imageElementLegendId
      }
      nextToken
    }
  }
`;
export const imageElementsByPageID = /* GraphQL */ `
  query ImageElementsByPageID(
    $pageID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImageElementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageElementsByPageID(
      pageID: $pageID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        order
        position
        region
        location
        motifs
        style
        legend {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          order
          position
          region
          lines {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        imageElementLegendId
      }
      nextToken
    }
  }
`;
export const imageElementsByUnitID = /* GraphQL */ `
  query ImageElementsByUnitID(
    $unitID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImageElementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageElementsByUnitID(
      unitID: $unitID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pageID
        page {
          id
          mediumID
          medium {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          number
          pagination
          foliation
          tags
          image
          commentary
          text {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        order
        position
        region
        location
        motifs
        style
        legend {
          id
          pageID
          page {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          order
          position
          region
          lines {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        imageElementLegendId
      }
      nextToken
    }
  }
`;
export const getSegment = /* GraphQL */ `
  query GetSegment($id: ID!) {
    getSegment(id: $id) {
      id
      mediumID
      medium {
        id
        editor
        siglum
        format
        pages {
          items {
            id
            mediumID
            number
            pagination
            foliation
            tags
            image
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        bookMediaId
        chapterCollationMediaId
      }
      unitID
      unit {
        id
        parentID
        parent {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        title
        order
        frame
        variant
        divider
        commentary
        motifs
        topics
        children {
          items {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          nextToken
        }
        segments {
          items {
            id
            mediumID
            unitID
            lacuna
            type
            tags
            startPage
            startLine
            startToken
            endPage
            endLine
            endToken
            createdAt
            updatedAt
          }
          nextToken
        }
        images {
          items {
            id
            pageID
            unitID
            order
            position
            region
            location
            motifs
            style
            createdAt
            updatedAt
            imageElementLegendId
          }
          nextToken
        }
        createdAt
        updatedAt
        bookUnitsId
      }
      lacuna
      type
      tags
      startPage
      startLine
      startToken
      endPage
      endLine
      endToken
      createdAt
      updatedAt
    }
  }
`;
export const listSegments = /* GraphQL */ `
  query ListSegments(
    $id: ID
    $filter: ModelSegmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSegments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        lacuna
        type
        tags
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const segmentsByMediumID = /* GraphQL */ `
  query SegmentsByMediumID(
    $mediumID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSegmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    segmentsByMediumID(
      mediumID: $mediumID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        lacuna
        type
        tags
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const segmentsByUnitID = /* GraphQL */ `
  query SegmentsByUnitID(
    $unitID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSegmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    segmentsByUnitID(
      unitID: $unitID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        lacuna
        type
        tags
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const segmentsByStartPage = /* GraphQL */ `
  query SegmentsByStartPage(
    $startPage: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelSegmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    segmentsByStartPage(
      startPage: $startPage
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        lacuna
        type
        tags
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const segmentsByEndPage = /* GraphQL */ `
  query SegmentsByEndPage(
    $endPage: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelSegmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    segmentsByEndPage(
      endPage: $endPage
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediumID
        medium {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        unitID
        unit {
          id
          parentID
          parent {
            id
            parentID
            title
            order
            frame
            variant
            divider
            commentary
            motifs
            topics
            createdAt
            updatedAt
            bookUnitsId
          }
          title
          order
          frame
          variant
          divider
          commentary
          motifs
          topics
          children {
            nextToken
          }
          segments {
            nextToken
          }
          images {
            nextToken
          }
          createdAt
          updatedAt
          bookUnitsId
        }
        lacuna
        type
        tags
        startPage
        startLine
        startToken
        endPage
        endLine
        endToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChapterCollation = /* GraphQL */ `
  query GetChapterCollation($id: ID!) {
    getChapterCollation(id: $id) {
      id
      editor
      name
      chapter
      media {
        items {
          id
          editor
          siglum
          format
          pages {
            nextToken
          }
          segments {
            nextToken
          }
          createdAt
          updatedAt
          bookMediaId
          chapterCollationMediaId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChapterCollations = /* GraphQL */ `
  query ListChapterCollations(
    $id: ID
    $filter: ModelChapterCollationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChapterCollations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        editor
        name
        chapter
        media {
          items {
            id
            editor
            siglum
            format
            createdAt
            updatedAt
            bookMediaId
            chapterCollationMediaId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
