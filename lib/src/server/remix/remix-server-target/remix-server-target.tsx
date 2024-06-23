import * as React from "react";
import { DEFAULT_ID, type ColorSchemeType } from "../../../constants";

/** @deprecated */
interface ForcedPage {
  pathMatcher: RegExp | string;
  themes: { theme?: string; colorScheme?: ColorSchemeType };
}

/** @deprecated */
interface RemixServerTargetProps extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  /** not implemented yet */
  forcedPages?: ForcedPage[];
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

/**
 * @deprecated - We no longer need server side wrappers or targets.
 *
 * @example
 * <RemixServerTarget />
 */
export function RemixServerTarget({
  children,
  tag,
  forcedPages,
  styles,
  ...props
}: RemixServerTargetProps) {
  const Tag: keyof JSX.IntrinsicElements = tag || "div";
  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id={DEFAULT_ID} {...props} data-testid="remix-server-target">
      {children}
    </Tag>
  );
}
