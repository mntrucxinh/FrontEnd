// components/SlideDown.tsx
import React, { useRef, useEffect, useState } from "react";

export default function SlideDown({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        setMaxHeight(`${ref.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{
        maxHeight,
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
