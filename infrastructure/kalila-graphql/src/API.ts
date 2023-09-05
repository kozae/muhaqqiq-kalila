/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBookInput = {
  author?: string | null,
  authorDeathYear?: number | null,
  editor?: string | null,
  id?: string | null,
  siglum: string,
  title?: string | null,
};

export type Book = {
  __typename: "Book",
  id: string,
  siglum: string,
  title?: string | null,
  author?: string | null,
  authorDeathYear?: number | null,
  media?: MediumList | null,
  editor?: string | null,
  version?: number | null,
};

export type MediumList = {
  __typename: "MediumList",
  items:  Array<Medium | null >,
  nextToken?: string | null,
};

export type Medium = {
  __typename: "Medium",
  id: string,
  bookId: string,
  siglum: string,
  format?: MediaFormat | null,
  pages?: PageList | null,
  segments?: SegmentList | null,
  editor?: string | null,
  version?: number | null,
};

export enum MediaFormat {
  DIGITAL = "DIGITAL",
  MANUSCRIPT = "MANUSCRIPT",
  PRINT = "PRINT",
}


export type PageList = {
  __typename: "PageList",
  items:  Array<Page | null >,
  nextToken?: string | null,
};

export type Page = {
  __typename: "Page",
  id: string,
  mediumId: string,
  number: number,
  image?: string | null,
  commentary?: Array< string | null > | null,
  foliation?: string | null,
  pagination?: number | null,
  tags?: Array< string | null > | null,
  images?:  Array<Image | null > | null,
  text?:  Array<TextElement | null > | null,
  segments?:  Array<Segment | null > | null,
  editor?: string | null,
  version?: number | null,
};

export type Image = {
  __typename: "Image",
  id: string,
  pageId: string,
  unitId?: string | null,
  legendId?: string | null,
  legend?: TextElement | null,
  location?: Array< number | null > | null,
  motifs?: Array< string | null > | null,
  order: number,
  position?: string | null,
  region?: Array< number | null > | null,
  style?: Array< string | null > | null,
  version?: number | null,
};

export type TextElement = {
  __typename: "TextElement",
  id: string,
  pageId: string,
  order: number,
  position?: string | null,
  region?: Array< number | null > | null,
  lines?:  Array<Line | null > | null,
  version?: number | null,
};

export type Line = {
  __typename: "Line",
  id: string,
  elementId: string,
  order: number,
  region?: Array< number | null > | null,
  states?: Array< string | null > | null,
  tokens?: Array< string | null > | null,
  version?: number | null,
};

export type Segment = {
  __typename: "Segment",
  id: string,
  mediumId: string,
  unitId: string,
  unit?: SegmentUnitConnection | null,
  startPage: number,
  startLine: number,
  startToken: number,
  endPage?: number | null,
  endLine?: number | null,
  endToken?: number | null,
  lacuna?: boolean | null,
  tags?: Array< string | null > | null,
  type?: string | null,
  version?: number | null,
};

export type SegmentUnitConnection = {
  __typename: "SegmentUnitConnection",
  bookId: string,
  id: string,
  commentary?: string | null,
  divider?: boolean | null,
  frame?: string | null,
  motifs?: Array< string | null > | null,
  order: number,
  title: string,
  topics?: Array< string | null > | null,
  variant?: string | null,
  version?: number | null,
};

export type SegmentList = {
  __typename: "SegmentList",
  items:  Array<Segment | null >,
  nextToken?: string | null,
};

export type CreateMediumInput = {
  bookId: string,
  editor?: string | null,
  format?: MediaFormat | null,
  id?: string | null,
  siglum: string,
};

export type LineDetectionJobInput = {
  id: string,
  manuscriptId: string,
  pages: Array< number >,
  notifications?: Array< string > | null,
  parameters?: string | null,
};

export type LineDetectionJob = {
  __typename: "LineDetectionJob",
  id: string,
  manuscriptId: string,
  state: number,
  pages?: Array< number | null > | null,
  finishedOn?: number | null,
  parameters?: string | null,
};

export enum Sources {
  books = "books",
  media = "media",
  itemCounts = "itemCounts",
  units = "units",
  pages = "pages",
  segments = "segments",
  images = "images",
  textElements = "textElements",
  lines = "lines",
  chapterCollations = "chapterCollations",
  lineDetectionJobs = "lineDetectionJobs",
}


export type ItemCount = {
  __typename: "ItemCount",
  table: string,
  count: number,
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type Unit = {
  __typename: "Unit",
  bookId: string,
  id: string,
  parentId: string,
  commentary?: string | null,
  divider?: boolean | null,
  frame?: string | null,
  motifs?: Array< string | null > | null,
  order: number,
  title: string,
  topics?: Array< string | null > | null,
  variant?: string | null,
  images?:  Array<Image | null > | null,
  children?: UnitList | null,
  segments?:  Array<Segment | null > | null,
  version?: number | null,
};

export type UnitList = {
  __typename: "UnitList",
  items:  Array<Unit | null >,
  nextToken?: string | null,
};

export type ChapterCollation = {
  __typename: "ChapterCollation",
  id: string,
  chapter: string,
  name?: string | null,
  mediumIds?: Array< string | null > | null,
  editor?: string | null,
  version?: number | null,
};

export type CreateBookMutationVariables = {
  input: CreateBookInput,
};

export type CreateBookMutation = {
  createBook?:  {
    __typename: "Book",
    id: string,
    siglum: string,
    title?: string | null,
    author?: string | null,
    authorDeathYear?: number | null,
    media?:  {
      __typename: "MediumList",
      items:  Array< {
        __typename: "Medium",
        id: string,
        bookId: string,
        siglum: string,
        format?: MediaFormat | null,
        pages?:  {
          __typename: "PageList",
          nextToken?: string | null,
        } | null,
        segments?:  {
          __typename: "SegmentList",
          nextToken?: string | null,
        } | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type CreateMediumMutationVariables = {
  input: CreateMediumInput,
};

export type CreateMediumMutation = {
  createMedium?:  {
    __typename: "Medium",
    id: string,
    bookId: string,
    siglum: string,
    format?: MediaFormat | null,
    pages?:  {
      __typename: "PageList",
      items:  Array< {
        __typename: "Page",
        id: string,
        mediumId: string,
        number: number,
        image?: string | null,
        commentary?: Array< string | null > | null,
        foliation?: string | null,
        pagination?: number | null,
        tags?: Array< string | null > | null,
        images?:  Array< {
          __typename: "Image",
          id: string,
          pageId: string,
          unitId?: string | null,
          legendId?: string | null,
          location?: Array< number | null > | null,
          motifs?: Array< string | null > | null,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          style?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        text?:  Array< {
          __typename: "TextElement",
          id: string,
          pageId: string,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          version?: number | null,
        } | null > | null,
        segments?:  Array< {
          __typename: "Segment",
          id: string,
          mediumId: string,
          unitId: string,
          startPage: number,
          startLine: number,
          startToken: number,
          endPage?: number | null,
          endLine?: number | null,
          endToken?: number | null,
          lacuna?: boolean | null,
          tags?: Array< string | null > | null,
          type?: string | null,
          version?: number | null,
        } | null > | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    segments?:  {
      __typename: "SegmentList",
      items:  Array< {
        __typename: "Segment",
        id: string,
        mediumId: string,
        unitId: string,
        unit?:  {
          __typename: "SegmentUnitConnection",
          bookId: string,
          id: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null,
        startPage: number,
        startLine: number,
        startToken: number,
        endPage?: number | null,
        endLine?: number | null,
        endToken?: number | null,
        lacuna?: boolean | null,
        tags?: Array< string | null > | null,
        type?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type CreateLineDetectionJobMutationVariables = {
  input: LineDetectionJobInput,
};

export type CreateLineDetectionJobMutation = {
  createLineDetectionJob?:  {
    __typename: "LineDetectionJob",
    id: string,
    manuscriptId: string,
    state: number,
    pages?: Array< number | null > | null,
    finishedOn?: number | null,
    parameters?: string | null,
  } | null,
};

export type GetItemCountQueryVariables = {
  table: Sources,
};

export type GetItemCountQuery = {
  getItemCount?:  {
    __typename: "ItemCount",
    table: string,
    count: number,
  } | null,
};

export type GetBookQueryVariables = {
  id: string,
};

export type GetBookQuery = {
  getBook?:  {
    __typename: "Book",
    id: string,
    siglum: string,
    title?: string | null,
    author?: string | null,
    authorDeathYear?: number | null,
    media?:  {
      __typename: "MediumList",
      items:  Array< {
        __typename: "Medium",
        id: string,
        bookId: string,
        siglum: string,
        format?: MediaFormat | null,
        pages?:  {
          __typename: "PageList",
          nextToken?: string | null,
        } | null,
        segments?:  {
          __typename: "SegmentList",
          nextToken?: string | null,
        } | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type ListBooksQuery = {
  listBooks?:  Array< {
    __typename: "Book",
    id: string,
    siglum: string,
    title?: string | null,
    author?: string | null,
    authorDeathYear?: number | null,
    media?:  {
      __typename: "MediumList",
      items:  Array< {
        __typename: "Medium",
        id: string,
        bookId: string,
        siglum: string,
        format?: MediaFormat | null,
        pages?:  {
          __typename: "PageList",
          nextToken?: string | null,
        } | null,
        segments?:  {
          __typename: "SegmentList",
          nextToken?: string | null,
        } | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null > | null,
};

export type GetMediumQueryVariables = {
  id: string,
};

export type GetMediumQuery = {
  getMedium?:  {
    __typename: "Medium",
    id: string,
    bookId: string,
    siglum: string,
    format?: MediaFormat | null,
    pages?:  {
      __typename: "PageList",
      items:  Array< {
        __typename: "Page",
        id: string,
        mediumId: string,
        number: number,
        image?: string | null,
        commentary?: Array< string | null > | null,
        foliation?: string | null,
        pagination?: number | null,
        tags?: Array< string | null > | null,
        images?:  Array< {
          __typename: "Image",
          id: string,
          pageId: string,
          unitId?: string | null,
          legendId?: string | null,
          location?: Array< number | null > | null,
          motifs?: Array< string | null > | null,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          style?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        text?:  Array< {
          __typename: "TextElement",
          id: string,
          pageId: string,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          version?: number | null,
        } | null > | null,
        segments?:  Array< {
          __typename: "Segment",
          id: string,
          mediumId: string,
          unitId: string,
          startPage: number,
          startLine: number,
          startToken: number,
          endPage?: number | null,
          endLine?: number | null,
          endToken?: number | null,
          lacuna?: boolean | null,
          tags?: Array< string | null > | null,
          type?: string | null,
          version?: number | null,
        } | null > | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    segments?:  {
      __typename: "SegmentList",
      items:  Array< {
        __typename: "Segment",
        id: string,
        mediumId: string,
        unitId: string,
        unit?:  {
          __typename: "SegmentUnitConnection",
          bookId: string,
          id: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null,
        startPage: number,
        startLine: number,
        startToken: number,
        endPage?: number | null,
        endLine?: number | null,
        endToken?: number | null,
        lacuna?: boolean | null,
        tags?: Array< string | null > | null,
        type?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type ListBookMediaQueryVariables = {
  id: string,
  limit?: number | null,
  nextToken?: string | null,
  sort?: SortDirection | null,
};

export type ListBookMediaQuery = {
  listBookMedia?:  {
    __typename: "MediumList",
    items:  Array< {
      __typename: "Medium",
      id: string,
      bookId: string,
      siglum: string,
      format?: MediaFormat | null,
      pages?:  {
        __typename: "PageList",
        items:  Array< {
          __typename: "Page",
          id: string,
          mediumId: string,
          number: number,
          image?: string | null,
          commentary?: Array< string | null > | null,
          foliation?: string | null,
          pagination?: number | null,
          tags?: Array< string | null > | null,
          editor?: string | null,
          version?: number | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      segments?:  {
        __typename: "SegmentList",
        items:  Array< {
          __typename: "Segment",
          id: string,
          mediumId: string,
          unitId: string,
          startPage: number,
          startLine: number,
          startToken: number,
          endPage?: number | null,
          endLine?: number | null,
          endToken?: number | null,
          lacuna?: boolean | null,
          tags?: Array< string | null > | null,
          type?: string | null,
          version?: number | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      editor?: string | null,
      version?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUnitQueryVariables = {
  id: string,
};

export type GetUnitQuery = {
  getUnit?:  {
    __typename: "Unit",
    bookId: string,
    id: string,
    parentId: string,
    commentary?: string | null,
    divider?: boolean | null,
    frame?: string | null,
    motifs?: Array< string | null > | null,
    order: number,
    title: string,
    topics?: Array< string | null > | null,
    variant?: string | null,
    images?:  Array< {
      __typename: "Image",
      id: string,
      pageId: string,
      unitId?: string | null,
      legendId?: string | null,
      legend?:  {
        __typename: "TextElement",
        id: string,
        pageId: string,
        order: number,
        position?: string | null,
        region?: Array< number | null > | null,
        lines?:  Array< {
          __typename: "Line",
          id: string,
          elementId: string,
          order: number,
          region?: Array< number | null > | null,
          states?: Array< string | null > | null,
          tokens?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        version?: number | null,
      } | null,
      location?: Array< number | null > | null,
      motifs?: Array< string | null > | null,
      order: number,
      position?: string | null,
      region?: Array< number | null > | null,
      style?: Array< string | null > | null,
      version?: number | null,
    } | null > | null,
    children?:  {
      __typename: "UnitList",
      items:  Array< {
        __typename: "Unit",
        bookId: string,
        id: string,
        parentId: string,
        commentary?: string | null,
        divider?: boolean | null,
        frame?: string | null,
        motifs?: Array< string | null > | null,
        order: number,
        title: string,
        topics?: Array< string | null > | null,
        variant?: string | null,
        images?:  Array< {
          __typename: "Image",
          id: string,
          pageId: string,
          unitId?: string | null,
          legendId?: string | null,
          location?: Array< number | null > | null,
          motifs?: Array< string | null > | null,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          style?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        children?:  {
          __typename: "UnitList",
          nextToken?: string | null,
        } | null,
        segments?:  Array< {
          __typename: "Segment",
          id: string,
          mediumId: string,
          unitId: string,
          startPage: number,
          startLine: number,
          startToken: number,
          endPage?: number | null,
          endLine?: number | null,
          endToken?: number | null,
          lacuna?: boolean | null,
          tags?: Array< string | null > | null,
          type?: string | null,
          version?: number | null,
        } | null > | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    segments?:  Array< {
      __typename: "Segment",
      id: string,
      mediumId: string,
      unitId: string,
      unit?:  {
        __typename: "SegmentUnitConnection",
        bookId: string,
        id: string,
        commentary?: string | null,
        divider?: boolean | null,
        frame?: string | null,
        motifs?: Array< string | null > | null,
        order: number,
        title: string,
        topics?: Array< string | null > | null,
        variant?: string | null,
        version?: number | null,
      } | null,
      startPage: number,
      startLine: number,
      startToken: number,
      endPage?: number | null,
      endLine?: number | null,
      endToken?: number | null,
      lacuna?: boolean | null,
      tags?: Array< string | null > | null,
      type?: string | null,
      version?: number | null,
    } | null > | null,
    version?: number | null,
  } | null,
};

export type ListUnitsQueryVariables = {
  parentId: string,
  limit?: number | null,
  orderGt?: number | null,
  orderLt?: number | null,
  nextToken?: string | null,
  sort?: SortDirection | null,
};

export type ListUnitsQuery = {
  listUnits?:  {
    __typename: "UnitList",
    items:  Array< {
      __typename: "Unit",
      bookId: string,
      id: string,
      parentId: string,
      commentary?: string | null,
      divider?: boolean | null,
      frame?: string | null,
      motifs?: Array< string | null > | null,
      order: number,
      title: string,
      topics?: Array< string | null > | null,
      variant?: string | null,
      images?:  Array< {
        __typename: "Image",
        id: string,
        pageId: string,
        unitId?: string | null,
        legendId?: string | null,
        legend?:  {
          __typename: "TextElement",
          id: string,
          pageId: string,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          version?: number | null,
        } | null,
        location?: Array< number | null > | null,
        motifs?: Array< string | null > | null,
        order: number,
        position?: string | null,
        region?: Array< number | null > | null,
        style?: Array< string | null > | null,
        version?: number | null,
      } | null > | null,
      children?:  {
        __typename: "UnitList",
        items:  Array< {
          __typename: "Unit",
          bookId: string,
          id: string,
          parentId: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      segments?:  Array< {
        __typename: "Segment",
        id: string,
        mediumId: string,
        unitId: string,
        unit?:  {
          __typename: "SegmentUnitConnection",
          bookId: string,
          id: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null,
        startPage: number,
        startLine: number,
        startToken: number,
        endPage?: number | null,
        endLine?: number | null,
        endToken?: number | null,
        lacuna?: boolean | null,
        tags?: Array< string | null > | null,
        type?: string | null,
        version?: number | null,
      } | null > | null,
      version?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPageQueryVariables = {
  id: string,
};

export type GetPageQuery = {
  getPage?:  {
    __typename: "Page",
    id: string,
    mediumId: string,
    number: number,
    image?: string | null,
    commentary?: Array< string | null > | null,
    foliation?: string | null,
    pagination?: number | null,
    tags?: Array< string | null > | null,
    images?:  Array< {
      __typename: "Image",
      id: string,
      pageId: string,
      unitId?: string | null,
      legendId?: string | null,
      legend?:  {
        __typename: "TextElement",
        id: string,
        pageId: string,
        order: number,
        position?: string | null,
        region?: Array< number | null > | null,
        lines?:  Array< {
          __typename: "Line",
          id: string,
          elementId: string,
          order: number,
          region?: Array< number | null > | null,
          states?: Array< string | null > | null,
          tokens?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        version?: number | null,
      } | null,
      location?: Array< number | null > | null,
      motifs?: Array< string | null > | null,
      order: number,
      position?: string | null,
      region?: Array< number | null > | null,
      style?: Array< string | null > | null,
      version?: number | null,
    } | null > | null,
    text?:  Array< {
      __typename: "TextElement",
      id: string,
      pageId: string,
      order: number,
      position?: string | null,
      region?: Array< number | null > | null,
      lines?:  Array< {
        __typename: "Line",
        id: string,
        elementId: string,
        order: number,
        region?: Array< number | null > | null,
        states?: Array< string | null > | null,
        tokens?: Array< string | null > | null,
        version?: number | null,
      } | null > | null,
      version?: number | null,
    } | null > | null,
    segments?:  Array< {
      __typename: "Segment",
      id: string,
      mediumId: string,
      unitId: string,
      unit?:  {
        __typename: "SegmentUnitConnection",
        bookId: string,
        id: string,
        commentary?: string | null,
        divider?: boolean | null,
        frame?: string | null,
        motifs?: Array< string | null > | null,
        order: number,
        title: string,
        topics?: Array< string | null > | null,
        variant?: string | null,
        version?: number | null,
      } | null,
      startPage: number,
      startLine: number,
      startToken: number,
      endPage?: number | null,
      endLine?: number | null,
      endToken?: number | null,
      lacuna?: boolean | null,
      tags?: Array< string | null > | null,
      type?: string | null,
      version?: number | null,
    } | null > | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type ListMediumPagesQueryVariables = {
  id: string,
  limit?: number | null,
  numberGt?: number | null,
  numberLt?: number | null,
  nextToken?: string | null,
  sort?: SortDirection | null,
};

export type ListMediumPagesQuery = {
  listMediumPages?:  {
    __typename: "PageList",
    items:  Array< {
      __typename: "Page",
      id: string,
      mediumId: string,
      number: number,
      image?: string | null,
      commentary?: Array< string | null > | null,
      foliation?: string | null,
      pagination?: number | null,
      tags?: Array< string | null > | null,
      images?:  Array< {
        __typename: "Image",
        id: string,
        pageId: string,
        unitId?: string | null,
        legendId?: string | null,
        legend?:  {
          __typename: "TextElement",
          id: string,
          pageId: string,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          version?: number | null,
        } | null,
        location?: Array< number | null > | null,
        motifs?: Array< string | null > | null,
        order: number,
        position?: string | null,
        region?: Array< number | null > | null,
        style?: Array< string | null > | null,
        version?: number | null,
      } | null > | null,
      text?:  Array< {
        __typename: "TextElement",
        id: string,
        pageId: string,
        order: number,
        position?: string | null,
        region?: Array< number | null > | null,
        lines?:  Array< {
          __typename: "Line",
          id: string,
          elementId: string,
          order: number,
          region?: Array< number | null > | null,
          states?: Array< string | null > | null,
          tokens?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        version?: number | null,
      } | null > | null,
      segments?:  Array< {
        __typename: "Segment",
        id: string,
        mediumId: string,
        unitId: string,
        unit?:  {
          __typename: "SegmentUnitConnection",
          bookId: string,
          id: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null,
        startPage: number,
        startLine: number,
        startToken: number,
        endPage?: number | null,
        endLine?: number | null,
        endToken?: number | null,
        lacuna?: boolean | null,
        tags?: Array< string | null > | null,
        type?: string | null,
        version?: number | null,
      } | null > | null,
      editor?: string | null,
      version?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSegmentQueryVariables = {
  id: string,
};

export type GetSegmentQuery = {
  getSegment?:  {
    __typename: "Segment",
    id: string,
    mediumId: string,
    unitId: string,
    unit?:  {
      __typename: "SegmentUnitConnection",
      bookId: string,
      id: string,
      commentary?: string | null,
      divider?: boolean | null,
      frame?: string | null,
      motifs?: Array< string | null > | null,
      order: number,
      title: string,
      topics?: Array< string | null > | null,
      variant?: string | null,
      version?: number | null,
    } | null,
    startPage: number,
    startLine: number,
    startToken: number,
    endPage?: number | null,
    endLine?: number | null,
    endToken?: number | null,
    lacuna?: boolean | null,
    tags?: Array< string | null > | null,
    type?: string | null,
    version?: number | null,
  } | null,
};

export type ListMediumSegmentsQueryVariables = {
  id: string,
  limit?: number | null,
  startPageGt?: number | null,
  startPageLt?: number | null,
  nextToken?: string | null,
  sort?: SortDirection | null,
};

export type ListMediumSegmentsQuery = {
  listMediumSegments?:  {
    __typename: "SegmentList",
    items:  Array< {
      __typename: "Segment",
      id: string,
      mediumId: string,
      unitId: string,
      unit?:  {
        __typename: "SegmentUnitConnection",
        bookId: string,
        id: string,
        commentary?: string | null,
        divider?: boolean | null,
        frame?: string | null,
        motifs?: Array< string | null > | null,
        order: number,
        title: string,
        topics?: Array< string | null > | null,
        variant?: string | null,
        version?: number | null,
      } | null,
      startPage: number,
      startLine: number,
      startToken: number,
      endPage?: number | null,
      endLine?: number | null,
      endToken?: number | null,
      lacuna?: boolean | null,
      tags?: Array< string | null > | null,
      type?: string | null,
      version?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChapterCollationQueryVariables = {
  id: string,
};

export type GetChapterCollationQuery = {
  getChapterCollation?:  {
    __typename: "ChapterCollation",
    id: string,
    chapter: string,
    name?: string | null,
    mediumIds?: Array< string | null > | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type ListChapterCollationsQuery = {
  listChapterCollations?:  Array< {
    __typename: "ChapterCollation",
    id: string,
    chapter: string,
    name?: string | null,
    mediumIds?: Array< string | null > | null,
    editor?: string | null,
    version?: number | null,
  } | null > | null,
};

export type ListLineDetectionJobsQuery = {
  listLineDetectionJobs?:  Array< {
    __typename: "LineDetectionJob",
    id: string,
    manuscriptId: string,
    state: number,
    pages?: Array< number | null > | null,
    finishedOn?: number | null,
    parameters?: string | null,
  } | null > | null,
};

export type GetLineDetectionJobQueryVariables = {
  manuscriptId: string,
  state: number,
};

export type GetLineDetectionJobQuery = {
  getLineDetectionJob?:  {
    __typename: "LineDetectionJob",
    id: string,
    manuscriptId: string,
    state: number,
    pages?: Array< number | null > | null,
    finishedOn?: number | null,
    parameters?: string | null,
  } | null,
};

export type OnCreateBookSubscription = {
  onCreateBook?:  {
    __typename: "Book",
    id: string,
    siglum: string,
    title?: string | null,
    author?: string | null,
    authorDeathYear?: number | null,
    media?:  {
      __typename: "MediumList",
      items:  Array< {
        __typename: "Medium",
        id: string,
        bookId: string,
        siglum: string,
        format?: MediaFormat | null,
        pages?:  {
          __typename: "PageList",
          nextToken?: string | null,
        } | null,
        segments?:  {
          __typename: "SegmentList",
          nextToken?: string | null,
        } | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};

export type OnCreateMediumSubscriptionVariables = {
  bookId: string,
};

export type OnCreateMediumSubscription = {
  onCreateMedium?:  {
    __typename: "Medium",
    id: string,
    bookId: string,
    siglum: string,
    format?: MediaFormat | null,
    pages?:  {
      __typename: "PageList",
      items:  Array< {
        __typename: "Page",
        id: string,
        mediumId: string,
        number: number,
        image?: string | null,
        commentary?: Array< string | null > | null,
        foliation?: string | null,
        pagination?: number | null,
        tags?: Array< string | null > | null,
        images?:  Array< {
          __typename: "Image",
          id: string,
          pageId: string,
          unitId?: string | null,
          legendId?: string | null,
          location?: Array< number | null > | null,
          motifs?: Array< string | null > | null,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          style?: Array< string | null > | null,
          version?: number | null,
        } | null > | null,
        text?:  Array< {
          __typename: "TextElement",
          id: string,
          pageId: string,
          order: number,
          position?: string | null,
          region?: Array< number | null > | null,
          version?: number | null,
        } | null > | null,
        segments?:  Array< {
          __typename: "Segment",
          id: string,
          mediumId: string,
          unitId: string,
          startPage: number,
          startLine: number,
          startToken: number,
          endPage?: number | null,
          endLine?: number | null,
          endToken?: number | null,
          lacuna?: boolean | null,
          tags?: Array< string | null > | null,
          type?: string | null,
          version?: number | null,
        } | null > | null,
        editor?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    segments?:  {
      __typename: "SegmentList",
      items:  Array< {
        __typename: "Segment",
        id: string,
        mediumId: string,
        unitId: string,
        unit?:  {
          __typename: "SegmentUnitConnection",
          bookId: string,
          id: string,
          commentary?: string | null,
          divider?: boolean | null,
          frame?: string | null,
          motifs?: Array< string | null > | null,
          order: number,
          title: string,
          topics?: Array< string | null > | null,
          variant?: string | null,
          version?: number | null,
        } | null,
        startPage: number,
        startLine: number,
        startToken: number,
        endPage?: number | null,
        endLine?: number | null,
        endToken?: number | null,
        lacuna?: boolean | null,
        tags?: Array< string | null > | null,
        type?: string | null,
        version?: number | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    editor?: string | null,
    version?: number | null,
  } | null,
};
