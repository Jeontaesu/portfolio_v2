"use client";

import { useActionState, useState } from "react";

import { FormStatus } from "@/components/features/admin/form-status";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { saveCategory } from "@/lib/admin/actions/category";
import { initialFormState, type FormState } from "@/lib/admin/form-state";
import { useUnsavedChangesWarning } from "@/lib/hooks/use-unsaved-changes-warning";
import { slugify } from "@/lib/utils/slugify";

const FIELD_LABELS = { name: "이름", slug: "Slug" };

type CategoryFormProps = {
  category?: { id: string; name: string; slug: string };
};

export function CategoryForm({ category }: CategoryFormProps) {
  const isEdit = Boolean(category);
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [dirty, setDirty] = useState(false);

  const [state, formAction] = useActionState(async (previous: FormState, formData: FormData) => {
    const result = await saveCategory(category?.id ?? null, previous, formData);
    if (result.status === "success") setDirty(false);
    return result;
  }, initialFormState);
  useUnsavedChangesWarning(dirty);

  const errors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="flex max-w-xl flex-col gap-6"
      noValidate
    >
      <FormStatus state={state} labels={FIELD_LABELS} />

      <FormField id="name" label="이름" required error={errors.name}>
        {(control) => (
          <Input
            {...control}
            name="name"
            value={name}
            maxLength={40}
            onChange={(event) => {
              setName(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
          />
        )}
      </FormField>

      <FormField
        id="slug"
        label="Slug"
        required
        description="블로그 필터 주소(?category=…)에 쓰입니다. 영문 소문자, 숫자, 하이픈(-)만 가능합니다."
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

      <div>
        <SubmitButton>저장</SubmitButton>
      </div>
    </form>
  );
}
