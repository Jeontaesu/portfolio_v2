/** Result of a form Server Action, read by useActionState. Field names match the form's input names. */
export type FormState = {
  status: "idle" | "success" | "error";
  /** Summary shown above the form. Generic: never contains database or stack details. */
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialFormState: FormState = { status: "idle" };

export const GENERIC_ERROR = "저장하지 못했습니다. 잠시 후 다시 시도해 주세요.";
