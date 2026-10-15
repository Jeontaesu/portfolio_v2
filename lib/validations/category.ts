import { z } from "zod";

import { slugSchema } from "./common";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요.")
    .max(40, "이름은 40자 이하로 입력해 주세요."),
  slug: slugSchema,
});

export type CategoryInput = z.infer<typeof categorySchema>;
