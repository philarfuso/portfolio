"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { installRevealMotion } from "@/lib/reveal-motion";

export function MotionOrchestrator() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    // Consulting owns its accepted Studio choreography; never register two observers for an element.
    if (!main || main.classList.contains("consulting-page")) return;
    return installRevealMotion(main);
  }, [pathname]);
  return null;
}
