import { z } from "zod";

import { markdownSchema, optional, slugSchema } from "./common";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "제목을 입력해 주세요.")
    .max(120, "제목은 120자 이하로 입력해 주세요."),
  slug: slugSchema,
  excerpt: z
    .string()
    .trim()
    .min(1, "요약을 입력해 주세요.")
    .max(300, "요약은 300자 이하로 입력해 주세요."),
  /** Category id; empty = uncategorized. */
  categoryId: optional(z.string().min(1).max(40)),
  content: markdownSchema,
  /** Which submit button was pressed. */
  intent: z.enum(["draft", "publish"]),
});

export type PostInput = z.infer<typeof postSchema>;
