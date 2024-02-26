"use client";
import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../constants";
import { useTheme } from "../../hooks";

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
  const { setForcedColorScheme } = useTheme();
  useEffect(() => {
    setForcedColorScheme(props.colorScheme);
    return () => {
      setForcedColorScheme(undefined);
    };
  }, [props.colorScheme, setForcedColorScheme]);
  return null;
}
