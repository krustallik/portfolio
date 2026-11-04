import { ArrowUpRight, GitBranch } from "lucide-react";
import { profile } from "../data/profile";
import { useLocale } from "../i18n/useLocale";

export function SiteFooter() {
  const { messages, format } = useLocale();
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>{messages.footer.designedBy} <strong>{profile.name}</strong></p>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label={format(messages.footer.githubLabel, { name: profile.name })}>
          <GitBranch size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <span>{messages.profile.location}</span>
      </div>
    </footer>
  );
}
