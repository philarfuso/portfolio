"use client";

import { useEffect, useRef } from "react";

export function ConsultingLayoutSelector() {
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);
  const frame = useRef(0);
  const generation = useRef(0);

  useEffect(() => () => {
    cancelAnimationFrame(frame.current);
    generation.current += 1;
  }, []);

  function rememberReadingPosition() {
    const main = document.querySelector(".consulting-page");
    const candidates = Array.from(main?.querySelectorAll<HTMLElement>(
      ".consulting-hero-main, .consulting-offer, .consulting-proof, .consulting-experience .consulting-section-heading, .consulting-start .consulting-section-heading, .consulting-start-layout, .consulting-close",
    ) ?? []).map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
      .sort((a, b) => Math.abs(a.rect.top - 80) - Math.abs(b.rect.top - 80));
    const current = candidates.find(({ rect }) => rect.top >= 0 && rect.top < window.innerHeight * 0.65) ?? candidates[0];
    anchor.current = current ? { element: current.element, top: current.rect.top } : null;
  }

  function restoreReadingPosition() {
    const current = anchor.current;
    const request = ++generation.current;
    cancelAnimationFrame(frame.current);
    if (!current) return;
    frame.current = requestAnimationFrame(() => {
      // Resolve the new layout before waiting for any newly used local font.
      current.element.getBoundingClientRect();
      void document.fonts.ready.then(() => {
        if (request !== generation.current || !current.element.isConnected) return;
        window.scrollBy({ top: current.element.getBoundingClientRect().top - current.top, behavior: "instant" });
      });
    });
  }

  return (
    <fieldset
      className="consulting-layout-selector"
      onPointerDownCapture={rememberReadingPosition}
      onKeyDownCapture={rememberReadingPosition}
      onChange={restoreReadingPosition}
    >
      <legend>Consulting layout preview</legend>
      <p className="consulting-layout-label" aria-hidden="true">Layout preview</p>
      <div className="consulting-layout-options">
        <label>
          <input type="radio" name="consulting-layout" id="consulting-layout-editorial" value="editorial" defaultChecked />
          <span><b>A</b> Editorial</span>
        </label>
        <label>
          <input type="radio" name="consulting-layout" id="consulting-layout-studio" value="studio" />
          <span><b>B</b> Studio</span>
        </label>
      </div>
    </fieldset>
  );
}
