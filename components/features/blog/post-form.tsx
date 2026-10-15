"use client";

import { useActionState, useState } from "react";

import { FormStatus } from "@/components/features/admin/form-status";
import { MarkdownEditor } from "@/components/features/admin/markdown-editor";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { savePost } from "@/lib/admin/actions/post";
import { initialFormState, type FormState } from "@/lib/admin/form-state";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { slugify } from "@/lib/utils/slugify";

const FIELD_LABELS = {
  title: "제목",
  slug: "Slug",
  categoryId: "카테고리",
  excerpt: "요약",
  content: "본문",
};

type PostFormProps = {
  categories: readonly { id: string; name: string }[];
  /** Present when editing; absent when creating. */
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: "DRAFT" | "PUBLISHED";
    categoryId: string | null;
  };
};

export function PostForm({ categories, post }: PostFormProps) {
  const isEdit = Boolean(post);
  const isPublished = post?.status === "PUBLISHED";

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  // A new post suggests the slug from the title until the author edits the slug themselves.
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [dirty, setDirty] = useState(false);

  const [state, formAction] = useActionState(async (previous: FormState, formData: FormData) => {
    const result = await savePost(post?.id ?? null, previous, formData);
    if (result.status === "success") setDirty(false);
    return result;
  }, initialFormState);
  useUnsavedChangesWarning(dirty);

  const errors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="flex flex-col gap-6"
      noValidate
    >
      <FormStatus state={state} labels={FIELD_LABELS} />

      <FormField id="title" label="제목" required error={errors.title}>
        {(control) => (
          <Input
            {...control}
            name="title"
            value={title}
            maxLength={120}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
          />
        )}
      </FormField>

      <FormField
        id="slug"
        label="Slug"
        required
        description={
          isPublished
            ? "공개 주소에 쓰입니다. 게시된 글의 slug를 바꾸면 기존 주소로 접근할 수 없습니다."
            : "공개 주소에 쓰입니다. 영문 소문자, 숫자, 하이픈(-)만 가능합니다."
        }
        error={errors.slug}
      >
        {(control) => (
          <Input
            {...control}
            name="slug"
            value={slug}
            maxLength={80}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
          />
        )}
      </FormField>

      <FormField id="categoryId" label="카테고리" error={errors.categoryId}>
        {(control) => (
          <Select {...control} name="categoryId" defaultValue={post?.categoryId ?? ""}>
            <option value="">미분류</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      </FormField>

      <FormField
        id="excerpt"
        label="요약"
        required
        description="목록과 검색 결과에 보입니다. 300자 이하."
        error={errors.excerpt}
      >
        {(control) => (
          <Textarea
            {...control}
            name="excerpt"
            defaultValue={post?.excerpt}
            maxLength={300}
            rows={3}
          />
        )}
      </FormField>

      <MarkdownEditor
        name="content"
        label="본문"
        defaultValue={post?.content}
        error={errors.content}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton name="intent" value="draft" variant="secondary">
          {isPublished ? "게시 취소 (초안으로)" : "초안 저장"}
        </SubmitButton>
        <SubmitButton name="intent" value="publish">
          {isPublished ? "변경 사항 저장" : "게시"}
        </SubmitButton>
      </div>
    </form>
  );
}
