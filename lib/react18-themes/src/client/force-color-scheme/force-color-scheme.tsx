"use client";
import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";

export interface ForceColorSchemeProps {
  /** colorScheme to force on a page */
  colorScheme: ColorSchemeType;
}

/**
 * @example
 * ```ts
 * <ForceColorScheme colorScheme="dark" />
 * ```
 */

export function ForceColorScheme(props: ForceColorSchemeProps) {
  const [setForcedColorScheme] = useTheme(state => [state.setForcedColorScheme]);
  useEffect(() => {
    setForcedColorScheme(props.colorScheme);
    return () => {
      setForcedColorScheme(undefined);
    };
  }, [props.colorScheme, setForcedColorScheme]);
  return null;
}
