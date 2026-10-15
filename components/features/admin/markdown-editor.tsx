"use client";

import { useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import { MarkdownContent } from "@/components/ui/markdown-content";
import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";
import { previewMarkdown } from "@/lib/admin/actions/preview";
import { cn } from "@/lib/utils/cn";

type MarkdownEditorProps = {
  /** Form field name and id. */
  name: string;
  label: string;
  defaultValue?: string;
  error?: readonly string[];
};

type Preview =
  { status: "loading" } | { status: "ready"; html: string } | { status: "error"; message: string };

const tabClass =
  "text-body-sm min-h-11 cursor-pointer border-b-2 border-transparent px-4 font-semibold text-secondary data-[state=active]:border-foreground data-[state=active]:text-foreground";

/**
 * Write / Preview tabs (DESIGN §6.4). Radix Tabs provides the roving focus and arrow-key behavior.
 * The text lives in state and is submitted through a hidden input, so it is sent even while Preview is open.
 * Preview is rendered on the server with the public sanitizing pipeline.
 */
export function MarkdownEditor({ name, label, defaultValue = "", error }: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState<Preview>({ status: "loading" });
  const requestId = useRef(0);

  async function loadPreview() {
    const current = ++requestId.current;
    setPreview({ status: "loading" });
    const result = await previewMarkdown(value);
    if (current !== requestId.current) return; // a newer request replaced this one
    setPreview(
      "html" in result
        ? { status: "ready", html: result.html }
        : { status: "error", message: result.error },
    );
  }

  return (
    <FormField id={name} label={label} required error={error}>
      {(control) => (
        <Tabs.Root
          defaultValue="write"
          onValueChange={(tab) => {
            if (tab === "preview") void loadPreview();
          }}
        >
          <Tabs.List aria-label={`${label} 편집 방식`} className="flex border-b border-border">
            <Tabs.Trigger value="write" className={tabClass}>
              Write
            </Tabs.Trigger>
            <Tabs.Trigger value="preview" className={tabClass}>
              Preview
            </Tabs.Trigger>
          </Tabs.List>

          <input type="hidden" name={name} value={value} />

          <Tabs.Content value="write" className="pt-3">
            <Textarea
              {...control}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              spellCheck={false}
              className={cn("min-h-[28rem] font-mono")}
            />
          </Tabs.Content>
          <Tabs.Content value="preview" className="min-h-[28rem] pt-6">
            {preview.status === "loading" && (
              <p role="status" className="text-body-sm text-secondary">
                미리보기를 만드는 중…
              </p>
            )}
            {preview.status === "error" && (
              <p role="alert" className="text-body-sm font-semibold text-destructive">
                {preview.message}
              </p>
            )}
            {preview.status === "ready" &&
              (preview.html ? (
                <MarkdownContent html={preview.html} />
              ) : (
                <p className="text-body-sm text-secondary">미리볼 내용이 없습니다.</p>
              ))}
          </Tabs.Content>
        </Tabs.Root>
      )}
    </FormField>
  );
}
