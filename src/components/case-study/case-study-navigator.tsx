"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, type FeaturedProject } from "@/content/projects";

type CaseStudyNavigatorProps = {
  currentProjectId: FeaturedProject["id"];
};

function NavigatorArrow({ direction }: { direction: "previous" | "next" }) {
  const isPrevious = direction === "previous";

  return (
    <svg
      aria-hidden="true"
      className="case-navigator-arrow"
      viewBox="0 0 16 16"
    >
      <path
        d={isPrevious ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function CaseStudyNavigator({
  currentProjectId,
}: CaseStudyNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const currentIndex = featuredProjects.findIndex(
    (project) => project.id === currentProjectId,
  );
  const currentProject = featuredProjects[currentIndex];
  const previousProject =
    featuredProjects[
      (currentIndex - 1 + featuredProjects.length) % featuredProjects.length
    ];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navigatorRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  if (!currentProject || !previousProject?.route || !nextProject?.route) {
    return null;
  }

  return (
    <div
      ref={navigatorRef}
      className="case-navigator"
      data-open={isOpen ? "true" : "false"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          navigatorRef.current
            ?.querySelector<HTMLButtonElement>(".case-navigator-trigger")
            ?.focus();
          setIsOpen(false);
        }
      }}
      onMouseLeave={() => {
        if (!navigatorRef.current?.contains(document.activeElement)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="case-navigator-trigger"
        type="button"
        aria-controls="case-navigator-destinations"
        aria-expanded={isOpen}
        aria-label="Open project navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">↔</span>
      </button>

      <nav
        id="case-navigator-destinations"
        className="case-navigator-menu"
        aria-label="Case study destinations"
        aria-hidden={!isOpen}
      >
        <Link
          aria-label={`Previous case study: ${previousProject.name}`}
          className="case-navigator-link case-navigator-previous"
          href={previousProject.route}
          tabIndex={isOpen ? 0 : -1}
        >
          <NavigatorArrow direction="previous" />
          <strong>{previousProject.name}</strong>
        </Link>

        <Link
          aria-label="Return to selected work on the home page"
          className="case-navigator-link case-navigator-home"
          href={`/#${currentProject.id}`}
          tabIndex={isOpen ? 0 : -1}
        >
          <strong>All work</strong>
        </Link>

        <Link
          aria-label={`Next case study: ${nextProject.name}`}
          className="case-navigator-link case-navigator-next"
          href={nextProject.route}
          tabIndex={isOpen ? 0 : -1}
        >
          <strong>{nextProject.name}</strong>
          <NavigatorArrow direction="next" />
        </Link>
      </nav>
    </div>
  );
}
