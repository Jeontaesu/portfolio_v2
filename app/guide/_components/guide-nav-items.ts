// Add a page here when you add app/guide/<slug>/page.tsx: this list is the only link between the two.
export const GUIDE_GROUPS = [
  {
    label: "Foundation",
    items: [
      { slug: "colors", label: "Colors" },
      { slug: "typography", label: "Typography" },
    ],
  },
  {
    label: "Actions",
    items: [{ slug: "button", label: "Button" }],
  },
  {
    label: "Inputs",
    items: [{ slug: "form-controls", label: "Form controls" }],
  },
  {
    label: "Data display",
    items: [
      { slug: "badge", label: "Badge" },
      { slug: "pagination", label: "Pagination" },
      { slug: "external-link", label: "ExternalLink" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { slug: "empty-state", label: "EmptyState" },
      { slug: "error-state", label: "ErrorState" },
      { slug: "skeleton", label: "Skeleton" },
    ],
  },
  {
    label: "Overlay",
    items: [{ slug: "confirm-delete", label: "ConfirmDelete" }],
  },
] as const;
