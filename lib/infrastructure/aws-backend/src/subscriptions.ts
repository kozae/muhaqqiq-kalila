/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook($filter: ModelSubscriptionBookFilterInput) {
    onCreateBook(filter: $filter) {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook($filter: ModelSubscriptionBookFilterInput) {
    onUpdateBook(filter: $filter) {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook($filter: ModelSubscriptionBookFilterInput) {
    onDeleteBook(filter: $filter) {
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
export const onCreateUnit = /* GraphQL */ `
  subscription OnCreateUnit($filter: ModelSubscriptionUnitFilterInput) {
    onCreateUnit(filter: $filter) {
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
export const onUpdateUnit = /* GraphQL */ `
  subscription OnUpdateUnit($filter: ModelSubscriptionUnitFilterInput) {
    onUpdateUnit(filter: $filter) {
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
export const onDeleteUnit = /* GraphQL */ `
  subscription OnDeleteUnit($filter: ModelSubscriptionUnitFilterInput) {
    onDeleteUnit(filter: $filter) {
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
export const onCreateMedium = /* GraphQL */ `
  subscription OnCreateMedium($filter: ModelSubscriptionMediumFilterInput) {
    onCreateMedium(filter: $filter) {
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
export const onUpdateMedium = /* GraphQL */ `
  subscription OnUpdateMedium($filter: ModelSubscriptionMediumFilterInput) {
    onUpdateMedium(filter: $filter) {
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
export const onDeleteMedium = /* GraphQL */ `
  subscription OnDeleteMedium($filter: ModelSubscriptionMediumFilterInput) {
    onDeleteMedium(filter: $filter) {
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
export const onCreatePage = /* GraphQL */ `
  subscription OnCreatePage($filter: ModelSubscriptionPageFilterInput) {
    onCreatePage(filter: $filter) {
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
export const onUpdatePage = /* GraphQL */ `
  subscription OnUpdatePage($filter: ModelSubscriptionPageFilterInput) {
    onUpdatePage(filter: $filter) {
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
export const onDeletePage = /* GraphQL */ `
  subscription OnDeletePage($filter: ModelSubscriptionPageFilterInput) {
    onDeletePage(filter: $filter) {
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
export const onCreateTextElement = /* GraphQL */ `
  subscription OnCreateTextElement(
    $filter: ModelSubscriptionTextElementFilterInput
  ) {
    onCreateTextElement(filter: $filter) {
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
export const onUpdateTextElement = /* GraphQL */ `
  subscription OnUpdateTextElement(
    $filter: ModelSubscriptionTextElementFilterInput
  ) {
    onUpdateTextElement(filter: $filter) {
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
export const onDeleteTextElement = /* GraphQL */ `
  subscription OnDeleteTextElement(
    $filter: ModelSubscriptionTextElementFilterInput
  ) {
    onDeleteTextElement(filter: $filter) {
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
export const onCreateLine = /* GraphQL */ `
  subscription OnCreateLine($filter: ModelSubscriptionLineFilterInput) {
    onCreateLine(filter: $filter) {
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
export const onUpdateLine = /* GraphQL */ `
  subscription OnUpdateLine($filter: ModelSubscriptionLineFilterInput) {
    onUpdateLine(filter: $filter) {
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
export const onDeleteLine = /* GraphQL */ `
  subscription OnDeleteLine($filter: ModelSubscriptionLineFilterInput) {
    onDeleteLine(filter: $filter) {
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
export const onCreateImageElement = /* GraphQL */ `
  subscription OnCreateImageElement(
    $filter: ModelSubscriptionImageElementFilterInput
  ) {
    onCreateImageElement(filter: $filter) {
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
export const onUpdateImageElement = /* GraphQL */ `
  subscription OnUpdateImageElement(
    $filter: ModelSubscriptionImageElementFilterInput
  ) {
    onUpdateImageElement(filter: $filter) {
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
export const onDeleteImageElement = /* GraphQL */ `
  subscription OnDeleteImageElement(
    $filter: ModelSubscriptionImageElementFilterInput
  ) {
    onDeleteImageElement(filter: $filter) {
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
export const onCreateSegment = /* GraphQL */ `
  subscription OnCreateSegment($filter: ModelSubscriptionSegmentFilterInput) {
    onCreateSegment(filter: $filter) {
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
export const onUpdateSegment = /* GraphQL */ `
  subscription OnUpdateSegment($filter: ModelSubscriptionSegmentFilterInput) {
    onUpdateSegment(filter: $filter) {
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
export const onDeleteSegment = /* GraphQL */ `
  subscription OnDeleteSegment($filter: ModelSubscriptionSegmentFilterInput) {
    onDeleteSegment(filter: $filter) {
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
export const onCreateChapterCollation = /* GraphQL */ `
  subscription OnCreateChapterCollation(
    $filter: ModelSubscriptionChapterCollationFilterInput
  ) {
    onCreateChapterCollation(filter: $filter) {
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
export const onUpdateChapterCollation = /* GraphQL */ `
  subscription OnUpdateChapterCollation(
    $filter: ModelSubscriptionChapterCollationFilterInput
  ) {
    onUpdateChapterCollation(filter: $filter) {
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
export const onDeleteChapterCollation = /* GraphQL */ `
  subscription OnDeleteChapterCollation(
    $filter: ModelSubscriptionChapterCollationFilterInput
  ) {
    onDeleteChapterCollation(filter: $filter) {
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
