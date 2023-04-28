/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createUnit = /* GraphQL */ `
  mutation CreateUnit(
    $input: CreateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    createUnit(input: $input, condition: $condition) {
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
export const updateUnit = /* GraphQL */ `
  mutation UpdateUnit(
    $input: UpdateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    updateUnit(input: $input, condition: $condition) {
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
export const deleteUnit = /* GraphQL */ `
  mutation DeleteUnit(
    $input: DeleteUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    deleteUnit(input: $input, condition: $condition) {
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
export const createMedium = /* GraphQL */ `
  mutation CreateMedium(
    $input: CreateMediumInput!
    $condition: ModelMediumConditionInput
  ) {
    createMedium(input: $input, condition: $condition) {
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
export const updateMedium = /* GraphQL */ `
  mutation UpdateMedium(
    $input: UpdateMediumInput!
    $condition: ModelMediumConditionInput
  ) {
    updateMedium(input: $input, condition: $condition) {
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
export const deleteMedium = /* GraphQL */ `
  mutation DeleteMedium(
    $input: DeleteMediumInput!
    $condition: ModelMediumConditionInput
  ) {
    deleteMedium(input: $input, condition: $condition) {
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
export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
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
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
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
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
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
export const createTextElement = /* GraphQL */ `
  mutation CreateTextElement(
    $input: CreateTextElementInput!
    $condition: ModelTextElementConditionInput
  ) {
    createTextElement(input: $input, condition: $condition) {
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
export const updateTextElement = /* GraphQL */ `
  mutation UpdateTextElement(
    $input: UpdateTextElementInput!
    $condition: ModelTextElementConditionInput
  ) {
    updateTextElement(input: $input, condition: $condition) {
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
export const deleteTextElement = /* GraphQL */ `
  mutation DeleteTextElement(
    $input: DeleteTextElementInput!
    $condition: ModelTextElementConditionInput
  ) {
    deleteTextElement(input: $input, condition: $condition) {
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
export const createLine = /* GraphQL */ `
  mutation CreateLine(
    $input: CreateLineInput!
    $condition: ModelLineConditionInput
  ) {
    createLine(input: $input, condition: $condition) {
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
export const updateLine = /* GraphQL */ `
  mutation UpdateLine(
    $input: UpdateLineInput!
    $condition: ModelLineConditionInput
  ) {
    updateLine(input: $input, condition: $condition) {
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
export const deleteLine = /* GraphQL */ `
  mutation DeleteLine(
    $input: DeleteLineInput!
    $condition: ModelLineConditionInput
  ) {
    deleteLine(input: $input, condition: $condition) {
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
export const createImageElement = /* GraphQL */ `
  mutation CreateImageElement(
    $input: CreateImageElementInput!
    $condition: ModelImageElementConditionInput
  ) {
    createImageElement(input: $input, condition: $condition) {
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
export const updateImageElement = /* GraphQL */ `
  mutation UpdateImageElement(
    $input: UpdateImageElementInput!
    $condition: ModelImageElementConditionInput
  ) {
    updateImageElement(input: $input, condition: $condition) {
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
export const deleteImageElement = /* GraphQL */ `
  mutation DeleteImageElement(
    $input: DeleteImageElementInput!
    $condition: ModelImageElementConditionInput
  ) {
    deleteImageElement(input: $input, condition: $condition) {
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
export const createSegment = /* GraphQL */ `
  mutation CreateSegment(
    $input: CreateSegmentInput!
    $condition: ModelSegmentConditionInput
  ) {
    createSegment(input: $input, condition: $condition) {
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
export const updateSegment = /* GraphQL */ `
  mutation UpdateSegment(
    $input: UpdateSegmentInput!
    $condition: ModelSegmentConditionInput
  ) {
    updateSegment(input: $input, condition: $condition) {
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
export const deleteSegment = /* GraphQL */ `
  mutation DeleteSegment(
    $input: DeleteSegmentInput!
    $condition: ModelSegmentConditionInput
  ) {
    deleteSegment(input: $input, condition: $condition) {
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
export const createChapterCollation = /* GraphQL */ `
  mutation CreateChapterCollation(
    $input: CreateChapterCollationInput!
    $condition: ModelChapterCollationConditionInput
  ) {
    createChapterCollation(input: $input, condition: $condition) {
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
export const updateChapterCollation = /* GraphQL */ `
  mutation UpdateChapterCollation(
    $input: UpdateChapterCollationInput!
    $condition: ModelChapterCollationConditionInput
  ) {
    updateChapterCollation(input: $input, condition: $condition) {
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
export const deleteChapterCollation = /* GraphQL */ `
  mutation DeleteChapterCollation(
    $input: DeleteChapterCollationInput!
    $condition: ModelChapterCollationConditionInput
  ) {
    deleteChapterCollation(input: $input, condition: $condition) {
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
