import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./Button";
import { CloseIcon } from "./icons";

type SheetProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  open: boolean;
  title: string;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Sheet({
  children,
  className,
  description,
  open,
  title,
  onClose
}: SheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.activeElement;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(timer);
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  function handleTrapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const elements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
    );
    const first = elements[0];
    const last = elements[elements.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="sheet-shell">
      <button
        aria-label="Close sheet"
        className="sheet-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={["sheet", className].filter(Boolean).join(" ")}
        onKeyDown={handleTrapFocus}
        ref={dialogRef}
        role="dialog"
      >
        <header className="sheet__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <IconButton label="Close" onClick={onClose} ref={closeRef} type="button">
            <CloseIcon />
          </IconButton>
        </header>
        <div className="sheet__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
