import { profile } from "@/content/profile";

import { ProfileLinks } from "./profile-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-12 lg:py-16">
        <p className="text-body-sm text-secondary">
          <strong className="text-foreground">{profile.brand}</strong> — {profile.tagline}
        </p>
        <ProfileLinks className="text-body-sm" />
        <p className="text-caption text-secondary">
          © {new Date().getFullYear()} {profile.brand}
        </p>
      </div>
    </footer>
  );
}
