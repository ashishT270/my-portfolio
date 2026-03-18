"use client";

import { useState, useEffect } from "react";

export default function Typewriter({
  text,
  speed = 60,
}: {
  text: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [index, text, speed]);

  return (
    <>
      {displayed}
      {!done && <span className="animate-blink">|</span>}
    </>
  );
}
