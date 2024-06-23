import type { HTMLProps, ReactNode } from "react";
import { DEFAULT_ID } from "../../../constants";
import type { ThemeSwitcherProps } from "../../../client";

/** @deprecated */
export type ForcedPage = { pathMatcher: RegExp | string; props: ThemeSwitcherProps };

/** @deprecated */
export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
  children?: ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  forcedPages?: ForcedPage[];
  /** id of target element to apply classes to. This is useful when you want to apply theme only to specific container. */
  targetId?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

/** @deprecated */
function sharedServerComponentRenderer(
  { children, tag, forcedPages, targetId, styles, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag
      id={targetId || DEFAULT_ID}
      {...props}
      data-nth="next"
      data-testid="nextjs-server-side-target">
      {children}
    </Tag>
  );
}

/**
 * @deprecated - We no longer need server side wrappers or targets.
 * This component will be removed in the next release.
 * @example
 * ```tsx
 * <NextJsSSGThemeSwitcher />
 * ```
 */
export function NextJsSSGThemeSwitcher(props: NextJsSSRThemeSwitcherProps) {
  return sharedServerComponentRenderer(props, "div");
}

/**
 * @deprecated - We no longer need server side wrappers or targets.
 * This component will be removed in the next release.
 * @example
 * ```tsx
 * <NextJsSSRThemeSwitcher />
 * ```
 */
export function NextJsSSRThemeSwitcher(props: NextJsSSRThemeSwitcherProps) {
  return sharedServerComponentRenderer(props, "div");
}

/**
 * @deprecated - We no longer need server side wrappers or targets.
 * This component will be removed in the next release.
 * @example
 * ```tsx
 * <NextJsServerTarget />
 * ```
 * For naming consistancy, clarity, and minimizing API updates */
export { NextJsSSGThemeSwitcher as NextJsServerTarget };

/** @deprecated */
export interface ServerSideWrapperProps extends NextJsSSRThemeSwitcherProps {
  /** @defaultValue 'html' */
  tag?: keyof JSX.IntrinsicElements;
}

/**
 * @deprecated - We no longer need server side wrappers or targets.
 * This component will be removed in the next release.
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 * @example
 * ```tsx
 * <ServerSideWrapperProps lang="en">
 *  <body>
 *    <ThemeSwitcher />
 *    {children}
 *  </body>
 * </ServerSideWrapperProps>
 * ```
 */
export function ServerSideWrapper(props: ServerSideWrapperProps) {
  return sharedServerComponentRenderer(props, "html");
}
