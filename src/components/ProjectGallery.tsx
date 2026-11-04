import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react";
import type { ProjectGalleryImage } from "../types";
import { useLocale } from "../i18n/useLocale";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface ProjectGalleryProps {
  projectName: string;
  images: ProjectGalleryImage[];
  note: string;
}

export function ProjectGallery({ projectName, images, note }: ProjectGalleryProps) {
  const { messages, format } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const image = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);

  if (!image) return null;

  const move = (offset: -1 | 1) => {
    setActiveIndex((current) => (current + offset + images.length) % images.length);
  };

  function handleLightboxKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    } else if (images.length > 1 && event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (images.length > 1 && event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "Tab") {
      const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.pointerType === "touch" ? event.clientX : null;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = pointerStartX.current;
    pointerStartX.current = null;
    if (startX === null || images.length < 2) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) < 48) return;
    suppressClick.current = true;
    window.setTimeout(() => { suppressClick.current = false; }, 0);
    move(distance < 0 ? 1 : -1);
  }

  const showControls = images.length > 1;

  return (
    <section className="project-gallery" aria-label={format(messages.gallery.label, { name: projectName })}>
      <div className="project-gallery-heading">
        <h2>{messages.gallery.screenshots}</h2>
        <p>{note}</p>
      </div>

      <figure className="gallery-figure">
        <div
          className={`gallery-viewport gallery-viewport--${image.orientation}`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStartX.current = null; }}
          role="group"
          aria-roledescription={messages.gallery.slide}
          aria-label={format(messages.gallery.screenshotOf, { current: activeIndex + 1, total: images.length })}
        >
          <button
            className="gallery-expand"
            type="button"
            ref={expandButtonRef}
            aria-label={format(messages.gallery.enlarge, { current: activeIndex + 1, total: images.length, caption: image.caption })}
            onClick={() => {
              if (suppressClick.current) return;
              setIsOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              decoding="async"
            />
            <span className="gallery-expand-label"><Maximize2 size={15} aria-hidden="true" /> {messages.gallery.openLarger}</span>
          </button>
        </div>
        <figcaption className="gallery-caption">
          <span>{image.caption}</span>
          <a href={image.sourceUrl} target="_blank" rel="noreferrer">
            {messages.gallery.original} <ExternalLink size={13} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>

      {showControls && (
        <>
          <div className="gallery-controls">
            <button className="gallery-control" type="button" onClick={() => move(-1)} aria-label={messages.gallery.previous}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <p className="gallery-count" aria-live="polite" aria-atomic="true">
              {activeIndex + 1} <span>/</span> {images.length}
            </p>
            <button className="gallery-control" type="button" onClick={() => move(1)} aria-label={messages.gallery.next}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="gallery-thumbnails" role="group" aria-label={messages.gallery.choose}>
            {images.map((item, index) => (
              <button
                className={`gallery-thumbnail${index === activeIndex ? " is-active" : ""}`}
                type="button"
                key={item.src}
                aria-label={format(messages.gallery.show, { current: index + 1, total: images.length, caption: item.caption })}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  aria-hidden="true"
                  width={item.thumbnailWidth}
                  height={item.thumbnailHeight}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {isOpen && (
        <div className="gallery-lightbox" onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <div
            className="gallery-lightbox-dialog"
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            aria-describedby="gallery-lightbox-caption"
            onKeyDown={handleLightboxKeyDown}
          >
            <div className="gallery-lightbox-toolbar">
              <div>
                <h2 id="gallery-lightbox-title">{projectName} · {format(messages.gallery.screenshotOf, { current: activeIndex + 1, total: images.length })}</h2>
                <p id="gallery-lightbox-caption">{image.caption}</p>
              </div>
              <LanguageSwitcher variant="lightbox" />
              <button className="gallery-control gallery-close" type="button" ref={closeButtonRef} onClick={() => setIsOpen(false)} aria-label={messages.gallery.close}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className={`gallery-lightbox-image gallery-lightbox-image--${image.orientation}`}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" />
            </div>
            {showControls && (
              <div className="gallery-lightbox-controls">
                <button className="gallery-control" type="button" onClick={() => move(-1)} aria-label={messages.gallery.previous}><ChevronLeft size={20} aria-hidden="true" /></button>
                <p>{activeIndex + 1} / {images.length}</p>
                <button className="gallery-control" type="button" onClick={() => move(1)} aria-label={messages.gallery.next}><ChevronRight size={20} aria-hidden="true" /></button>
              </div>
            )}
            <a className="gallery-original-link" href={image.sourceUrl} target="_blank" rel="noreferrer">{messages.gallery.viewOriginal} <ExternalLink size={14} aria-hidden="true" /></a>
          </div>
        </div>
      )}
    </section>
  );
}
