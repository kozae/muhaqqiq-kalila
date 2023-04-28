import { v4 as uuidv4 } from "uuid";

export interface ImportDto {
  _id: { $oid: string };
  BookId: string;
  Editor: string;
  EditionProgress: string;
  FrameTags: string[];
  Motifs: string[];
  Topics: string[];
  Order: number[];
  Variant: string | null;
  Divider: boolean;
  Title: string;
  AdditionalCommentary: string;
  CreatedAt: Date;
  Version: string;
}

interface ExportDto {
  Id: string;
  BookId: string;
  ParentId: string;
  Frame: string;
  Motifs: null;
  Topics: null;
  Order: number;
  Variant: string | null;
  Divider: boolean;
  Title: string;
  Commentary: string;
  CreatedAt: string;
  UpdatedAt: string;
  TypeName: string;
  LastChangedAt: string;
  Version: string;
}

function createSectionRoot(
  BookId: string,
  title: string,
  order: number
): Partial<ExportDto> {
  return {
    Id: uuidv4(),
    BookId,
    Title: title,
    Order: order,
    Divider: true,
  };
}

function findChapterRoot(
  src: ImportDto[],
  sectionOrder: number,
  chapterOrder: number
) {
  return src.find(
    (u) =>
      u.Order.length === 2 &&
      u.Order[0] === sectionOrder &&
      u.Order[1] === chapterOrder
  );
}

function processChapters(
  src: ImportDto[],
  sectionRoot: Partial<ExportDto>,
  limit: number,
  map: Record<string, string>
): Partial<ExportDto>[] {
  const result: Partial<ExportDto>[] = [];

  for (let chapterOrder = 1; chapterOrder <= limit; chapterOrder++) {
    const chapterRootSrc = findChapterRoot(
      src,
      sectionRoot.Order as number,
      chapterOrder
    );
    if (!chapterRootSrc) {
      continue;
    }
    const chapterRootNewId = uuidv4();
    map[chapterRootSrc._id.$oid] = chapterRootNewId;
    const chapterRoot: Partial<ExportDto> = {
      Id: chapterRootNewId,
      BookId: sectionRoot.BookId,
      ParentId: sectionRoot.Id,
      Frame: chapterRootSrc.FrameTags.find((f) => f.length > 0) || "",
      Title: chapterRootSrc.Title,
      Order: chapterOrder,
      Divider: true,
    };
    result.push(chapterRoot);

    for (const unit of src) {
      if (
        unit.Order.length > 2 &&
        unit.Order[0] === sectionRoot.Order &&
        unit.Order[1] === chapterOrder
      ) {
        const unitNewId = uuidv4();
        map[unit._id.$oid] = unitNewId;
        result.push({
          Id: unitNewId,
          BookId: sectionRoot.BookId,
          ParentId: chapterRoot.Id,
          Title: unit.Title,
          Order: unit.Order[2],
          Frame: chapterRoot.Frame,
          Divider: unit.Divider,
        });
      }
    }
  }

  return result;
}

export function transformUnits(
  src: ImportDto[],
  BookId: string
): [Partial<ExportDto>[], Record<string, string>] {
  const introsRoot = createSectionRoot(BookId, "Introductions", 1);
  const fablesRoot = createSectionRoot(BookId, "Fables", 2);
  const map: Record<string, string> = {};
  const res: Partial<ExportDto>[] = [introsRoot, fablesRoot];

  res.push(...processChapters(src, introsRoot, 5, map));
  res.push(...processChapters(src, fablesRoot, 17, map));

  return [res, map];
}
