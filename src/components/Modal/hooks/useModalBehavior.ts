import { useEffect, useId, useRef } from 'react';

interface IUseModalBehaviorParams {
  isOpen: boolean;
  onClose: () => void;
}

interface IUseModalBehaviorReturn {
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useModalBehavior = ({
  isOpen,
  onClose,
}: IUseModalBehaviorParams): IUseModalBehaviorReturn => {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect((): (() => void) | undefined => {
    if (!isOpen) {
      return undefined;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusInitialElement = (): void => {
      const surface = surfaceRef.current;

      if (!surface) {
        return;
      }

      const focusables = surface.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const firstFocusable = focusables[0];

      if (firstFocusable) {
        firstFocusable.focus();
        return;
      }

      surface.focus();
    };

    focusInitialElement();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const surface = surfaceRef.current;

      if (!surface) {
        return;
      }

      const focusables = Array.from(
        surface.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element: HTMLElement) => !element.hasAttribute('data-modal-skip-focus'));

      if (focusables.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus?.();
    };
  }, [isOpen, onClose]);

  return {
    surfaceRef,
    titleId,
    descriptionId,
  };
};
