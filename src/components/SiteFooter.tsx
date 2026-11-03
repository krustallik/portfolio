import { ArrowUpRight, GitBranch } from "lucide-react";
import { profile } from "../data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>Designed and built by <strong>{profile.name}</strong></p>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Ihor Havryliv on GitHub">
          <GitBranch size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <span>Košice, Slovakia</span>
      </div>
    </footer>
  );
}
