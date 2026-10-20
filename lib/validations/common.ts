import { z } from "zod";

/** English lowercase kebab-case. Used in public URLs (CLAUDE.md §7). */
export const slugSchema = z
  .string()
  .trim()
  .min(1, "slug를 입력해 주세요.")
  .max(80, "slug는 80자 이하로 입력해 주세요.")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "영문 소문자, 숫자, 하이픈(-)만 쓸 수 있습니다.");

/** Only http(s). Blocks javascript: / data: URLs that would end up in an <a href>. */
export const httpUrlSchema = z
  .string()
  .trim()
  .max(500, "주소가 너무 깁니다.")
  .refine((value) => {
    try {
      const { protocol } = new URL(value);
      return protocol === "https:" || protocol === "http:";
    } catch {
      return false;
    }
  }, "http:// 또는 https:// 로 시작하는 주소를 입력해 주세요.");

/**
 * Thumbnails are files under public/ ("/images/projects/x.png"). Remote URLs are not allowed yet:
 * next/image needs every remote host listed in next.config, and uploads come with the Media feature.
 */
export const publicImagePathSchema = z
  .string()
  .trim()
  .max(300, "경로가 너무 깁니다.")
  .regex(
    /^\/(?!\/)(?!.*\.\.)[\w\-./]+\.(png|jpe?g|webp|avif|gif|svg)$/i,
    "/images/... 처럼 public 폴더 안의 이미지 경로를 입력해 주세요.",
  );

export const markdownSchema = z
  .string()
  .max(200_000, "본문이 너무 깁니다.")
  .refine((value) => value.trim().length > 0, "본문을 입력해 주세요.");

/** An empty form field means "not set". */
export function optional<T extends z.ZodType>(schema: T) {
  return z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    schema.optional(),
  );
}

export const statusSchema = z.enum(["DRAFT", "PUBLISHED"]);

/** "2026-03" from <input type="month"> → first day of that month (UTC), matching the seed. */
export const monthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM 형식으로 입력해 주세요.")
  .transform((value) => new Date(`${value}-01T00:00:00.000Z`));
