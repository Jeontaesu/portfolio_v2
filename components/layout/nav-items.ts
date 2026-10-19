/** Full list: the mobile menu and the footer show every page. */
export const NAV_ITEMS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
  { href: "/guide", label: "Components" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

/** Desktop header (md+): page links in the second row, Resume and Contact at the row ends. */
export const MAIN_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
  { href: "/guide", label: "Components" },
] as const;

export const RESUME_NAV_ITEM = { href: "/resume", label: "Resume" } as const;
export const CONTACT_NAV_ITEM = { href: "/contact", label: "Contact" } as const;
