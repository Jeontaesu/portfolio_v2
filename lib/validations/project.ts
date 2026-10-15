import { z } from "zod";

import {
  httpUrlSchema,
  markdownSchema,
  monthSchema,
  optional,
  publicImagePathSchema,
  slugSchema,
} from "./common";

/** "React, Next.js\nTypeScript" → ["React", "Next.js", "TypeScript"] (deduplicated, trimmed). */
const techStackSchema = z
  .string()
  .transform((value) => [
    ...new Set(
      value
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ])
  .pipe(
    z
      .array(z.string().max(40, "기술 이름이 너무 깁니다."))
      .min(1, "기술 스택을 하나 이상 입력해 주세요.")
      .max(20, "기술 스택은 20개까지 입력할 수 있습니다."),
  );

export const projectSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "제목을 입력해 주세요.")
      .max(120, "제목은 120자 이하로 입력해 주세요."),
    slug: slugSchema,
    summary: z
      .string()
      .trim()
      .min(1, "요약을 입력해 주세요.")
      .max(300, "요약은 300자 이하로 입력해 주세요."),
    thumbnail: optional(publicImagePathSchema),
    thumbnailAlt: optional(z.string().trim().max(200, "대체 텍스트는 200자 이하로 입력해 주세요.")),
    thumbnailFit: z.enum(["COVER", "CONTAIN"]),
    techStack: techStackSchema,
    role: z
      .string()
      .trim()
      .min(1, "역할을 입력해 주세요.")
      .max(120, "역할은 120자 이하로 입력해 주세요."),
    startedAt: optional(monthSchema),
    endedAt: optional(monthSchema),
    githubUrl: optional(httpUrlSchema),
    demoUrl: optional(httpUrlSchema),
    /** A checkbox sends "on" or nothing. */
    featured: z.preprocess((value) => value === "on", z.boolean()),
    content: markdownSchema,
    intent: z.enum(["draft", "publish"]),
  })
  .superRefine((data, ctx) => {
    if (data.thumbnail && !data.thumbnailAlt) {
      ctx.addIssue({
        code: "custom",
        path: ["thumbnailAlt"],
        message: "썸네일을 쓰면 스크린 리더용 대체 텍스트가 필요합니다.",
      });
    }
    if (data.startedAt && data.endedAt && data.endedAt < data.startedAt) {
      ctx.addIssue({
        code: "custom",
        path: ["endedAt"],
        message: "종료일은 시작일 이후여야 합니다.",
      });
    }
  });

export type ProjectInput = z.infer<typeof projectSchema>;
