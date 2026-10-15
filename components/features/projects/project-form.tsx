"use client";

import { useActionState, useState } from "react";

import { FormStatus } from "@/components/features/admin/form-status";
import { MarkdownEditor } from "@/components/features/admin/markdown-editor";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { saveProject } from "@/lib/admin/actions/project";
import { initialFormState, type FormState } from "@/lib/admin/form-state";
import type { AdminProjectDetail } from "@/lib/admin/queries";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { slugify } from "@/lib/utils/slugify";

const FIELD_LABELS = {
  title: "제목",
  slug: "Slug",
  summary: "요약",
  thumbnail: "썸네일",
  thumbnailAlt: "썸네일 대체 텍스트",
  thumbnailFit: "썸네일 맞춤",
  techStack: "기술 스택",
  role: "역할",
  startedAt: "시작",
  endedAt: "종료",
  githubUrl: "GitHub URL",
  demoUrl: "Demo URL",
  content: "본문",
};

export function ProjectForm({ project }: { project?: AdminProjectDetail }) {
  const isEdit = Boolean(project);
  const isPublished = project?.status === "PUBLISHED";

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [dirty, setDirty] = useState(false);

  const [state, formAction] = useActionState(async (previous: FormState, formData: FormData) => {
    const result = await saveProject(project?.id ?? null, previous, formData);
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
            ? "공개 주소에 쓰입니다. 게시된 프로젝트의 slug를 바꾸면 기존 주소로 접근할 수 없습니다."
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

      <FormField
        id="summary"
        label="요약"
        required
        description="목록과 검색 결과에 보입니다. 300자 이하."
        error={errors.summary}
      >
        {(control) => (
          <Textarea
            {...control}
            name="summary"
            defaultValue={project?.summary}
            maxLength={300}
            rows={3}
          />
        )}
      </FormField>

      <FormField id="role" label="역할" required error={errors.role}>
        {(control) => (
          <Input {...control} name="role" defaultValue={project?.role} maxLength={120} />
        )}
      </FormField>

      <FormField
        id="techStack"
        label="기술 스택"
        required
        description="쉼표(,) 또는 줄바꿈으로 구분합니다. 예: React, TypeScript"
        error={errors.techStack}
      >
        {(control) => (
          <Textarea
            {...control}
            name="techStack"
            defaultValue={project?.techStack.join(", ")}
            rows={2}
          />
        )}
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="startedAt" label="시작" error={errors.startedAt}>
          {(control) => (
            <Input {...control} name="startedAt" type="month" defaultValue={project?.startedAt} />
          )}
        </FormField>
        <FormField id="endedAt" label="종료" description="비우면 진행 중" error={errors.endedAt}>
          {(control) => (
            <Input {...control} name="endedAt" type="month" defaultValue={project?.endedAt} />
          )}
        </FormField>
      </div>

      <FormField
        id="thumbnail"
        label="썸네일"
        description="public 폴더 안의 이미지 경로입니다. 예: /images/projects/logo_nh.png"
        error={errors.thumbnail}
      >
        {(control) => (
          <Input
            {...control}
            name="thumbnail"
            defaultValue={project?.thumbnail ?? ""}
            maxLength={300}
          />
        )}
      </FormField>

      <FormField
        id="thumbnailAlt"
        label="썸네일 대체 텍스트"
        description="썸네일을 쓸 때 필수입니다. 이미지를 보지 못하는 사용자에게 읽힙니다."
        error={errors.thumbnailAlt}
      >
        {(control) => (
          <Input
            {...control}
            name="thumbnailAlt"
            defaultValue={project?.thumbnailAlt ?? ""}
            maxLength={200}
          />
        )}
      </FormField>

      <FormField
        id="thumbnailFit"
        label="썸네일 맞춤"
        description="로고나 도표처럼 잘리면 안 되는 이미지는 Contain."
        error={errors.thumbnailFit}
      >
        {(control) => (
          <Select
            {...control}
            name="thumbnailFit"
            defaultValue={project?.thumbnailFit ?? "COVER"}
            className="md:max-w-xs"
          >
            <option value="COVER">Cover (꽉 채우기)</option>
            <option value="CONTAIN">Contain (전체 보이기)</option>
          </Select>
        )}
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="githubUrl" label="GitHub URL" error={errors.githubUrl}>
          {(control) => (
            <Input
              {...control}
              name="githubUrl"
              type="url"
              defaultValue={project?.githubUrl ?? ""}
              maxLength={500}
            />
          )}
        </FormField>
        <FormField id="demoUrl" label="Demo URL" error={errors.demoUrl}>
          {(control) => (
            <Input
              {...control}
              name="demoUrl"
              type="url"
              defaultValue={project?.demoUrl ?? ""}
              maxLength={500}
            />
          )}
        </FormField>
      </div>

      <CheckboxField
        id="featured"
        name="featured"
        label="Featured"
        description="체크하면 홈의 Selected Works에 나옵니다."
        defaultChecked={project?.featured}
      />

      <MarkdownEditor
        name="content"
        label="본문 (Case Study)"
        defaultValue={project?.content}
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
