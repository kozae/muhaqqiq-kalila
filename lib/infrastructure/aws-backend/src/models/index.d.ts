import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum MediumType {
  MANUSCRIPT = "MANUSCRIPT",
  PRINT = "PRINT",
  ELECTRONIC = "ELECTRONIC"
}



type EagerChapterCollation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChapterCollation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly media?: (MediumChapterCollation | null)[] | null;
  readonly chapter?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChapterCollation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChapterCollation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly media: AsyncCollection<MediumChapterCollation>;
  readonly chapter?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChapterCollation = LazyLoading extends LazyLoadingDisabled ? EagerChapterCollation : LazyChapterCollation

export declare const ChapterCollation: (new (init: ModelInit<ChapterCollation>) => ChapterCollation) & {
  copyOf(source: ChapterCollation, mutator: (draft: MutableModel<ChapterCollation>) => MutableModel<ChapterCollation> | void): ChapterCollation;
}

type EagerToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lineID: string;
  readonly raw: string;
  readonly state?: string | null;
  readonly orderInLine: number;
  readonly orderInPage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyToken = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Token, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lineID: string;
  readonly raw: string;
  readonly state?: string | null;
  readonly orderInLine: number;
  readonly orderInPage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Token = LazyLoading extends LazyLoadingDisabled ? EagerToken : LazyToken

export declare const Token: (new (init: ModelInit<Token>) => Token) & {
  copyOf(source: Token, mutator: (draft: MutableModel<Token>) => MutableModel<Token> | void): Token;
}

type EagerLine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Line, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly textElementID: string;
  readonly tokens?: (Token | null)[] | null;
  readonly order?: number | null;
  readonly region?: (number | null)[] | null;
  readonly text?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Line, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly textElementID: string;
  readonly tokens: AsyncCollection<Token>;
  readonly order?: number | null;
  readonly region?: (number | null)[] | null;
  readonly text?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Line = LazyLoading extends LazyLoadingDisabled ? EagerLine : LazyLine

export declare const Line: (new (init: ModelInit<Line>) => Line) & {
  copyOf(source: Line, mutator: (draft: MutableModel<Line>) => MutableModel<Line> | void): Line;
}

type EagerTextElement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TextElement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pageID: string;
  readonly lines?: (Line | null)[] | null;
  readonly order?: number | null;
  readonly position?: string | null;
  readonly region?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTextElement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TextElement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pageID: string;
  readonly lines: AsyncCollection<Line>;
  readonly order?: number | null;
  readonly position?: string | null;
  readonly region?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TextElement = LazyLoading extends LazyLoadingDisabled ? EagerTextElement : LazyTextElement

export declare const TextElement: (new (init: ModelInit<TextElement>) => TextElement) & {
  copyOf(source: TextElement, mutator: (draft: MutableModel<TextElement>) => MutableModel<TextElement> | void): TextElement;
}

type EagerImageElement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ImageElement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pageID: string;
  readonly legend?: TextElement | null;
  readonly depictsUnitID: string;
  readonly position?: string | null;
  readonly order?: number | null;
  readonly location?: (number | null)[] | null;
  readonly motifs?: (string | null)[] | null;
  readonly style?: (string | null)[] | null;
  readonly region?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly imageElementLegendId?: string | null;
}

type LazyImageElement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ImageElement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pageID: string;
  readonly legend: AsyncItem<TextElement | undefined>;
  readonly depictsUnitID: string;
  readonly position?: string | null;
  readonly order?: number | null;
  readonly location?: (number | null)[] | null;
  readonly motifs?: (string | null)[] | null;
  readonly style?: (string | null)[] | null;
  readonly region?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly imageElementLegendId?: string | null;
}

export declare type ImageElement = LazyLoading extends LazyLoadingDisabled ? EagerImageElement : LazyImageElement

export declare const ImageElement: (new (init: ModelInit<ImageElement>) => ImageElement) & {
  copyOf(source: ImageElement, mutator: (draft: MutableModel<ImageElement>) => MutableModel<ImageElement> | void): ImageElement;
}

type EagerPage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Page, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mediumID: string;
  readonly textElements?: (TextElement | null)[] | null;
  readonly imageElements?: (ImageElement | null)[] | null;
  readonly number: number;
  readonly pagination?: number | null;
  readonly foliation?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Page, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mediumID: string;
  readonly textElements: AsyncCollection<TextElement>;
  readonly imageElements: AsyncCollection<ImageElement>;
  readonly number: number;
  readonly pagination?: number | null;
  readonly foliation?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Page = LazyLoading extends LazyLoadingDisabled ? EagerPage : LazyPage

export declare const Page: (new (init: ModelInit<Page>) => Page) & {
  copyOf(source: Page, mutator: (draft: MutableModel<Page>) => MutableModel<Page> | void): Page;
}

type EagerMedium = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Medium, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookID: string;
  readonly pages?: (Page | null)[] | null;
  readonly segments?: (Segment | null)[] | null;
  readonly chapterCollations?: (MediumChapterCollation | null)[] | null;
  readonly editor?: string | null;
  readonly siglum?: string | null;
  readonly type?: MediumType | keyof typeof MediumType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMedium = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Medium, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookID: string;
  readonly pages: AsyncCollection<Page>;
  readonly segments: AsyncCollection<Segment>;
  readonly chapterCollations: AsyncCollection<MediumChapterCollation>;
  readonly editor?: string | null;
  readonly siglum?: string | null;
  readonly type?: MediumType | keyof typeof MediumType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Medium = LazyLoading extends LazyLoadingDisabled ? EagerMedium : LazyMedium

export declare const Medium: (new (init: ModelInit<Medium>) => Medium) & {
  copyOf(source: Medium, mutator: (draft: MutableModel<Medium>) => MutableModel<Medium> | void): Medium;
}

type EagerSegment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Segment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mediumID: string;
  readonly unitID: string;
  readonly type?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly start?: number[] | null;
  readonly end?: (number | null)[] | null;
  readonly lacuna?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySegment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Segment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mediumID: string;
  readonly unitID: string;
  readonly type?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly start?: number[] | null;
  readonly end?: (number | null)[] | null;
  readonly lacuna?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Segment = LazyLoading extends LazyLoadingDisabled ? EagerSegment : LazySegment

export declare const Segment: (new (init: ModelInit<Segment>) => Segment) & {
  copyOf(source: Segment, mutator: (draft: MutableModel<Segment>) => MutableModel<Segment> | void): Segment;
}

type EagerUnit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Unit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookID: string;
  readonly images?: (ImageElement | null)[] | null;
  readonly segments?: (Segment | null)[] | null;
  readonly title: string;
  readonly order?: number[] | null;
  readonly variant?: string | null;
  readonly divider?: boolean | null;
  readonly topics?: (string | null)[] | null;
  readonly motifs?: (string | null)[] | null;
  readonly commentary?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUnit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Unit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookID: string;
  readonly images: AsyncCollection<ImageElement>;
  readonly segments: AsyncCollection<Segment>;
  readonly title: string;
  readonly order?: number[] | null;
  readonly variant?: string | null;
  readonly divider?: boolean | null;
  readonly topics?: (string | null)[] | null;
  readonly motifs?: (string | null)[] | null;
  readonly commentary?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Unit = LazyLoading extends LazyLoadingDisabled ? EagerUnit : LazyUnit

export declare const Unit: (new (init: ModelInit<Unit>) => Unit) & {
  copyOf(source: Unit, mutator: (draft: MutableModel<Unit>) => MutableModel<Unit> | void): Unit;
}

type EagerBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly siglum: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly authorDeathYear?: number | null;
  readonly media?: (Medium | null)[] | null;
  readonly units?: (Unit | null)[] | null;
  readonly editor?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly siglum: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly authorDeathYear?: number | null;
  readonly media: AsyncCollection<Medium>;
  readonly units: AsyncCollection<Unit>;
  readonly editor?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Book = LazyLoading extends LazyLoadingDisabled ? EagerBook : LazyBook

export declare const Book: (new (init: ModelInit<Book>) => Book) & {
  copyOf(source: Book, mutator: (draft: MutableModel<Book>) => MutableModel<Book> | void): Book;
}

type EagerMediumChapterCollation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MediumChapterCollation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chapterCollationId?: string | null;
  readonly mediumId?: string | null;
  readonly chapterCollation: ChapterCollation;
  readonly medium: Medium;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMediumChapterCollation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MediumChapterCollation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chapterCollationId?: string | null;
  readonly mediumId?: string | null;
  readonly chapterCollation: AsyncItem<ChapterCollation>;
  readonly medium: AsyncItem<Medium>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MediumChapterCollation = LazyLoading extends LazyLoadingDisabled ? EagerMediumChapterCollation : LazyMediumChapterCollation

export declare const MediumChapterCollation: (new (init: ModelInit<MediumChapterCollation>) => MediumChapterCollation) & {
  copyOf(source: MediumChapterCollation, mutator: (draft: MutableModel<MediumChapterCollation>) => MutableModel<MediumChapterCollation> | void): MediumChapterCollation;
}