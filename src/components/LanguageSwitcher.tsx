import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale } from "../i18n/useLocale";

interface LanguageSwitcherProps {
  variant?: "navigation" | "lightbox";
}

export function LanguageSwitcher({ variant = "navigation" }: LanguageSwitcherProps) {
  const { locale, setLocale, messages } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();
  const selectedIndex = locale === "en" ? 0 : 1;
  const options = [
    { locale: "en" as const, label: messages.header.languageEnglish },
    { locale: "sk" as const, label: messages.header.languageSlovak },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  function focusOption(index: number) {
    optionRefs.current[index]?.focus();
  }

  function openMenu(focusIndex = selectedIndex) {
    setIsOpen(true);
    window.requestAnimationFrame(() => focusOption(focusIndex));
  }

  function closeMenu(restoreFocus = false) {
    setIsOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(true);
      return;
    }

    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = optionRefs.current.findIndex((option) => option === document.activeElement);
    if (!isOpen) {
      openMenu(event.key === "End" || event.key === "ArrowUp" ? options.length - 1 : 0);
      return;
    }

    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? options.length - 1
        : (currentIndex < 0 ? selectedIndex : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    focusOption(nextIndex);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  }

  const activeLanguage = options[selectedIndex]?.label ?? options[0].label;

  return (
    <div
      className={`language-picker language-picker--${variant}`}
      ref={pickerRef}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        className="language-trigger"
        type="button"
        ref={triggerRef}
        aria-label={`${messages.header.language}: ${activeLanguage}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => isOpen ? closeMenu() : openMenu()}
      >
        <Globe2 size={16} aria-hidden="true" />
        <span>{activeLanguage}</span>
        <ChevronDown className="language-trigger-chevron" size={14} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="language-menu" id={menuId} role="menu" aria-label={messages.header.language}>
          {options.map((option, index) => (
            <button
              className={`language-option${locale === option.locale ? " is-active" : ""}`}
              type="button"
              key={option.locale}
              role="menuitemradio"
              aria-checked={locale === option.locale}
              lang={option.locale}
              tabIndex={-1}
              ref={(element) => { optionRefs.current[index] = element; }}
              onClick={() => {
                setLocale(option.locale);
                closeMenu(true);
              }}
            >
              <span className="language-option-check" aria-hidden="true">
                {locale === option.locale && <Check size={15} strokeWidth={2.25} />}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
