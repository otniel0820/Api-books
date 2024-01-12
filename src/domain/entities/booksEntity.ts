import zod from "zod";
import { BaseEntity } from "./base";

export const BOOK_ID_PREFIX = "book"; // este es el prefijo que llevara el id de cada libro

export const bookSchema = zod.object({
  title: zod.string(),
  author: zod.string(),
  description: zod.string(),
  price: zod.string(),
  fileImg: zod.string(),
  rating: zod.string(),
  genre: zod.string(),
});

export type BookDTO = zod.infer<typeof bookSchema> & BaseEntity
