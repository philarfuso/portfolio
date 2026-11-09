"use client";

import { useEffect } from "react";

const groupSelector = ".consulting-section-heading, .consulting-offer, .consulting-proof, .consulting-process-steps, .consulting-practical, .consulting-close";

export function ConsultingStudioMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".consulting-page");
    if (!main) return;

    const groups = Array.from(main.querySelectorAll<HTMLElement>(groupSelector));
    const visuals = Array.from(main.querySelectorAll<HTMLElement>(".consulting-proof-visual"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealed = new Set<HTMLElement>();
    let observer: IntersectionObserver | null = null;
    let pointerFrame = 0;

    function reveal(element: HTMLElement, delay = 0) {
      element.style.setProperty("--studio-reveal-delay", `${delay}ms`);
      element.dataset.studioVisible = "true";
      revealed.add(element);
    }

    function resetVisuals() {
      cancelAnimationFrame(pointerFrame);
      visuals.forEach((visual) => {
        visual.style.removeProperty("--studio-pointer-x");
        visual.style.removeProperty("--studio-pointer-y");
        visual.style.removeProperty("--studio-pointer-rotate");
      });
    }

    function syncMotion() {
      observer?.disconnect();
      resetVisuals();
      if (reduced.matches || !("IntersectionObserver" in window)) {
        main!.dataset.studioMotion = "reduced";
        groups.forEach((element) => reveal(element));
        return;
      }

      main!.dataset.studioMotion = "ready";
      observer = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
          reveal(entry.target as HTMLElement, Math.min(index * 70, 140));
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

      groups.forEach((element) => {
        element.dataset.studioReveal = "true";
        const rect = element.getBoundingClientRect();
        if (revealed.has(element) || (rect.top < window.innerHeight && rect.bottom > 0)) {
          reveal(element);
        } else {
          delete element.dataset.studioVisible;
          observer!.observe(element);
        }
      });
    }

    function revealFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const group = event.target.closest<HTMLElement>("[data-studio-reveal]");
      if (group) {
        reveal(group);
        observer?.unobserve(group);
      }
    }

    function moveVisual(event: PointerEvent) {
      if (reduced.matches || !finePointer.matches) return;
      const visual = event.currentTarget as HTMLElement;
      const rect = visual.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        visual.style.setProperty("--studio-pointer-x", `${x * 14}px`);
        visual.style.setProperty("--studio-pointer-y", `${y * 10}px`);
        visual.style.setProperty("--studio-pointer-rotate", `${x * 3}deg`);
      });
    }

    visuals.forEach((visual) => {
      visual.addEventListener("pointermove", moveVisual);
      visual.addEventListener("pointerleave", resetVisuals);
    });
    main.addEventListener("focusin", revealFocus);
    reduced.addEventListener("change", syncMotion);
    syncMotion();

    return () => {
      observer?.disconnect();
      resetVisuals();
      main.removeAttribute("data-studio-motion");
      main.removeEventListener("focusin", revealFocus);
      reduced.removeEventListener("change", syncMotion);
      groups.forEach((element) => {
        delete element.dataset.studioReveal;
        delete element.dataset.studioVisible;
        element.style.removeProperty("--studio-reveal-delay");
      });
      visuals.forEach((visual) => {
        visual.removeEventListener("pointermove", moveVisual);
        visual.removeEventListener("pointerleave", resetVisuals);
      });
    };
  }, []);

  return null;
}
