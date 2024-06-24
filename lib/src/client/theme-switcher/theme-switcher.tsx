import { useEffect } from "react";
import { ColorSchemeType } from "../../types";
import { ResolveFunc, UpdateDOMFunc, UpdateForcedPropsFunc, noFOUCScript } from "./no-fouc";
import { initialState, useForcedStore, useThemeStore } from "../../store";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  themeTransition?: string;
  /** The nonce value for your Content Security Policy. */
  nonce?: string;
}

let media: MediaQueryList;
let updateDOM: UpdateDOMFunc;
let resolveTheme: ResolveFunc;
let updateForcedProps: UpdateForcedPropsFunc;
let updateForcedState: UpdateForcedPropsFunc;

const Script = ({ nonce, forcedTheme, forcedColorScheme }: ThemeSwitcherProps) => {
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (typeof window !== "undefined" && !window.m)
    noFOUCScript(DEFAULT_ID, initialState, forcedTheme, forcedColorScheme);
  if (typeof m !== "undefined")
    [media, updateDOM, resolveTheme, updateForcedProps, updateForcedState] = [m, u, r, f, g];
  return (
    <script
      suppressHydrationWarning
      // skipcq: JS-0440
      dangerouslySetInnerHTML={{
        __html: `(${noFOUCScript.toString()})(${JSON.stringify([DEFAULT_ID, initialState, forcedTheme, forcedColorScheme]).slice(1, -1)})`,
      }}
      nonce={nonce}
    />
  );
};

/** disable transition while switching theme */
const modifyTransition = (themeTransition = "none") => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `transition: ${themeTransition.split(";")[0]} !important;`;
  document.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(document.body);
    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
  };
};

const Switcher = ({ forcedTheme, forcedColorScheme, themeTransition }: ThemeSwitcherProps) => {
  const [state, setState] = useThemeStore();
  const [forced] = useForcedStore();

  useEffect(() => {
    media.addEventListener("change", () =>
      setState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === DEFAULT_ID)
        setState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreThansitions = modifyTransition(themeTransition);
    updateDOM(resolveTheme(state));
    restoreThansitions();
    localStorage.setItem(DEFAULT_ID, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    updateForcedProps(forcedTheme, forcedColorScheme);
    updateDOM(resolveTheme(state));
  }, [forcedColorScheme, forcedTheme]);

  useEffect(() => {
    updateForcedState(forced.f, forced.fc);
    updateDOM(resolveTheme(state));
  }, [forced]);
  return null;
};

/**
 *
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  return (
    <>
      <Script {...props} />
      <Switcher {...props} />
    </>
  );
};
