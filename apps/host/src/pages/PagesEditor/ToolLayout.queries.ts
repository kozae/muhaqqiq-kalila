export const getMedium = /* GraphQL */ `
  query GetMedium($id: ID!) {
    getMedium(id: $id) {
      editor
      siglum
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
          }
          version
        }
        location
        motifs
        order
        position
        region
        style
        version
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
        }
        version
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
      }
      editor
      version
    }
  }
`;
