"use client";
import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section is entering the "viewport area" we defined
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        // rootMargin: top, right, bottom, left
        // This triggers when the section is 20% from the top 
        rootMargin: "-20% 0% -70% 0%",
        threshold: 0 
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}