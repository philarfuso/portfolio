/** Progressive enhancement: server HTML is visible and every installed resource is owned by this scope. */
export function installRevealMotion(scope: HTMLElement, view: Window = window) {
  const elements = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]"));
  const reduced = view.matchMedia("(prefers-reduced-motion: reduce)");
  const revealed = new Set<HTMLElement>();
  let observer: IntersectionObserver | undefined;

  function reveal(element: HTMLElement, immediate = false) {
    element.dataset.revealState = "visible";
    if (immediate) element.style.setProperty("--reveal-delay", "0ms");
    revealed.add(element);
    observer?.unobserve(element);
  }

  function sync() {
    observer?.disconnect();
    if (reduced.matches || !("IntersectionObserver" in view)) {
      scope.dataset.motionReady = "reduced";
      elements.forEach((element) => reveal(element, true));
      return;
    }
    scope.dataset.motionReady = "ready";
    // Even long articles reveal at their first intersection, never after a percentage of their height.
    const Observer = (view as Window & { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver;
    observer = new Observer((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 135)}ms`);
        reveal(element);
      });
    }, { threshold: 0, rootMargin: "0px" });
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (revealed.has(element) || (rect.top < view.innerHeight && rect.bottom > 0)) {
        reveal(element, true);
      } else {
        delete element.dataset.revealState;
        observer?.observe(element);
      }
    });
  }

  function revealFocus(event: FocusEvent) {
    // A focused child can be inside several reveal groups; all ancestors must become visible.
    let element = event.target as HTMLElement | null;
    while (element && element !== scope) {
      if (elements.includes(element)) reveal(element, true);
      element = element.parentElement;
    }
  }
  scope.addEventListener("focusin", revealFocus);
  reduced.addEventListener("change", sync);
  sync();
  return () => {
    observer?.disconnect();
    scope.removeEventListener("focusin", revealFocus);
    reduced.removeEventListener("change", sync);
    delete scope.dataset.motionReady;
    elements.forEach((element) => {
      delete element.dataset.revealState;
      element.style.removeProperty("--reveal-delay");
    });
  };
}
