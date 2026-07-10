"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useReducedMotionPreference() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const reduced = useReducedMotion();
  return hydrated && Boolean(reduced);
}
