// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MediumType = {
  "MANUSCRIPT": "MANUSCRIPT",
  "PRINT": "PRINT",
  "ELECTRONIC": "ELECTRONIC"
};

const { ChapterCollation, Token, Line, TextElement, ImageElement, Page, Medium, Segment, Unit, Book, MediumChapterCollation } = initSchema(schema);

export {
  ChapterCollation,
  Token,
  Line,
  TextElement,
  ImageElement,
  Page,
  Medium,
  Segment,
  Unit,
  Book,
  MediumChapterCollation,
  MediumType
};