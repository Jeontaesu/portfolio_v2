import type { Metadata } from "next";

import { CheckboxField } from "@/components/ui/checkbox-field";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "Form controls" };

const USAGE = `<FormField id="title" label="제목" required error={fieldErrors.title}>
  {(control) => <Input name="title" {...control} />}
</FormField>

<CheckboxField id="featured" name="featured" label="Featured" description="Home에 노출" />`;

export default function FormControlsGuidePage() {
  return (
    <GuidePage
      title="Form controls"
      source="components/ui/{input, textarea, select, checkbox-field, form-field}.tsx"
      description="네이티브 input/select/textarea를 토큰으로 스타일링합니다. 키보드·스크린 리더·모바일 선택기는 브라우저 동작을 그대로 씁니다. 입력창 경계는 --border(대비 1.24)가 아니라 --muted(4.83)입니다 (D-026)."
    >
      <Demo
        title="Input · Textarea · Select"
        description="라벨이 없는 단독 컨트롤은 aria-label로 이름을 붙였습니다."
        column
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <Input aria-label="Input 예시" placeholder="Input" />
          <Textarea aria-label="Textarea 예시" placeholder="Textarea" />
          <Select aria-label="Select 예시" defaultValue="frontend">
            <option value="frontend">Frontend</option>
            <option value="css">CSS</option>
          </Select>
        </div>
      </Demo>
      <Demo
        title="State"
        description="focus는 Tab으로 이동해서 확인합니다 (2px ring + offset). invalid는 aria-invalid로 켜집니다."
        column
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <Input aria-label="기본" placeholder="default" />
          <Input aria-label="오류" aria-invalid="true" defaultValue="invalid" />
          <Input aria-label="비활성화" disabled defaultValue="disabled" />
        </div>
      </Demo>
      <Demo
        title="FormField"
        description="Label + 컨트롤 + 설명 + 오류. 설명과 오류는 aria-describedby로 컨트롤에 연결됩니다. 오류는 아이콘과 텍스트로 전해서 색에만 의존하지 않습니다."
        column
      >
        <div className="flex w-full max-w-md flex-col gap-6">
          <FormField
            id="guide-title"
            label="제목"
            required
            description="목록과 검색 결과에 보입니다."
          >
            {(control) => <Input name="title" {...control} />}
          </FormField>
          <FormField
            id="guide-slug"
            label="Slug"
            error={["영문 소문자와 하이픈만 쓸 수 있습니다."]}
          >
            {(control) => <Input name="slug" defaultValue="Next JS" {...control} />}
          </FormField>
        </div>
      </Demo>
      <Demo
        title="CheckboxField"
        description="44px 높이의 label 안에 네이티브 체크박스를 둬서, 행 전체가 터치 영역입니다."
      >
        <CheckboxField
          id="guide-featured"
          name="featured"
          label="Featured"
          description="Home의 Selected Works에 노출합니다."
        />
      </Demo>
      <PropsTable
        rows={[
          {
            name: "FormField.id",
            type: "string",
            description: "컨트롤의 id와 name, 오류 요약 링크의 대상",
          },
          { name: "FormField.label", type: "string", description: "보이는 label (필수)" },
          {
            name: "FormField.required",
            type: "boolean",
            description: "'(필수)' 표시와 aria-required",
          },
          {
            name: "FormField.description",
            type: "string",
            description: "힌트. aria-describedby로 연결",
          },
          {
            name: "FormField.error",
            type: "readonly string[]",
            description: "있으면 aria-invalid와 오류 문구",
          },
          {
            name: "FormField.children",
            type: "(control) => ReactNode",
            description: "컨트롤에 펼쳐서 넘길 id·aria 속성을 받는 함수",
          },
          {
            name: "CheckboxField.label / description",
            type: "string",
            description: "체크박스 이름과 보충 설명",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
