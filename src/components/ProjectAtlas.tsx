import { useLocale } from "../i18n/useLocale";

export function ProjectAtlas() {
  const { messages } = useLocale();
  return (
    <figure className="atlas-card" aria-label={messages.atlas.description}>
      <div className="atlas-card-head">
        <span>{messages.atlas.label}</span>
        <span className="atlas-index">KE / 01</span>
      </div>
      <svg className="atlas-drawing" viewBox="0 0 540 370" role="img" aria-labelledby="atlas-title atlas-desc">
        <title id="atlas-title">{messages.atlas.title}</title>
        <desc id="atlas-desc">{messages.atlas.description}</desc>
        <defs>
          <pattern id="atlas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".28" />
          </pattern>
        </defs>
        <rect width="540" height="370" fill="url(#atlas-grid)" />
        <path d="M-15 304C68 293 75 223 157 224s91 72 165 54 87-79 131-74 66 48 102 24" fill="none" stroke="#b8c4c9" strokeWidth="1.2" />
        <path d="M-21 330c84-14 91-83 176-83s89 72 165 54 83-78 127-72 72 45 108 20" fill="none" stroke="#b8c4c9" strokeWidth="1.2" />
        <path d="M28 294 157 224l114 54 118-74 98 18" fill="none" stroke="#315fc0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 294v-54M157 224v-63M271 278v49M389 204v-59M487 222v-57" stroke="#315fc0" strokeWidth="1.3" strokeDasharray="3 5" />
        <g fill="#f4f2ec" stroke="#315fc0" strokeWidth="3">
          <circle cx="28" cy="294" r="8" />
          <circle cx="157" cy="224" r="8" />
          <circle cx="271" cy="278" r="8" />
          <circle cx="389" cy="204" r="8" />
          <circle cx="487" cy="222" r="8" />
        </g>
        <circle cx="389" cy="204" r="19" fill="none" stroke="#db9a61" strokeWidth="1.4" />
        <path d="M29 29v30M14 44h30M477 299v30M462 314h30" stroke="#74848a" strokeWidth="1.2" />
        <text x="25" y="24">{messages.atlas.north}</text>
        <text x="448" y="355">{messages.atlas.field}</text>
      </svg>
      <div className="atlas-label atlas-label--build"><span>01</span><strong>{messages.atlas.build}</strong><small>{messages.atlas.applications}</small></div>
      <div className="atlas-label atlas-label--automate"><span>02</span><strong>{messages.atlas.automate}</strong><small>{messages.atlas.repeatableWork}</small></div>
      <div className="atlas-label atlas-label--research"><span>03</span><strong>{messages.atlas.investigate}</strong><small>{messages.atlas.dataSystems}</small></div>
      <figcaption>{messages.atlas.caption}</figcaption>
    </figure>
  );
}
