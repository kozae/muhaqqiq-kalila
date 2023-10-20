import { z, defineCollection } from "astro:content";

const mediaPgaesCollection = defineCollection({
  type: "data", // v2.5.0 and later
  schema: z.object({
    id: z.string(),
    siglum: z.string(),
    pages: z.array(
      z.object({
        id: z.string(),
        number: z.number(),
      }),
    ),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  "media-pages": mediaPgaesCollection,
};
