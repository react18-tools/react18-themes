"use client";

import { useTheme } from "react18-themes/hooks";
import { ColorSwitch } from "react18-themes/color-switch";
import styles from "./header.module.scss";
import { KeyboardEvent, useCallback } from "react";

/** This is a wrapper around `react18-themes's ColorSwitch component to improve mobile view. */

export function ThemeSwitch() {
  const { colorSchemePref, toggleColorScheme } = useTheme();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        toggleColorScheme();
      }
    },
    [toggleColorScheme],
  );

  const handleClick = useCallback(() => toggleColorScheme(), [toggleColorScheme]);

  return (
    <div
      className={styles.themeswitch}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button">
      <ColorSwitch />
      <span className="mb" suppressHydrationWarning>
        {colorSchemePref}
      </span>
    </div>
  );
}
