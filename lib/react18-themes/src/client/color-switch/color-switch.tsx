import * as React from "react";
import { useTheme } from "../../hooks";

export interface ColorSwitchProps {
  /** Diameter of the color color switch */
  size?: number;
}

/**
 * Color switch button to quickly set user preference
 *
 * @example
 * ```ts
 * <ColorSwitch />
 * ```
 *
 * custom size
 * ```ts
 * <ColorSwitch size={20} />
 * ```
 */
export function ColorSwitch({ size = 25 }: ColorSwitchProps) {
  const { colorSchemePref, setColorSchemePref } = useTheme();
  const toggleColorScheme = () => {
    switch (colorSchemePref) {
      case "":
      case "system":
        setColorSchemePref("dark");
        break;
      case "dark":
        setColorSchemePref("light");
        break;
      case "light":
        setColorSchemePref("system");
    }
  };
  return (
    <button
      className="react18-themes--color-switch"
      data-testid="color-switch"
      onClick={toggleColorScheme}
      // @ts-expect-error -- setting custom attribute
      style={{ "--size": `${size}px` }}
      type="button"
    />
  );
}
