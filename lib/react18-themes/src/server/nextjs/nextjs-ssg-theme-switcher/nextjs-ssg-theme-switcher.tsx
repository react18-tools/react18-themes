import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { DEFAULT_ID } from "../../../constants";
import { getDataProps, parseState, resolveTheme } from "../../../utils";
import type { ThemeSwitcherProps } from "../../../client";

export type ForcedPage = { pathMatcher: RegExp | string; props: ThemeSwitcherProps };

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
  children?: ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  forcedPages?: ForcedPage[];
  /** id of target element to apply classes to. This is useful when you want to apply theme only to specific container. */
  targetId?: string;
}

function sharedServerComponentRenderer(
  { children, tag, forcedPages, targetId, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;
  const state = cookies().get(DEFAULT_ID)?.value;

  const path = headers().get("referer");
  const forcedPageProps = forcedPages?.find(forcedPage => path?.match(forcedPage.pathMatcher))?.props;

  const themeState = state ? parseState(state) : undefined;
  const resolvedData = resolveTheme(themeState, forcedPageProps);
  const dataProps = getDataProps(resolvedData);
  if (targetId) dataProps.className += " nth-scoped";

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id={targetId || DEFAULT_ID} {...dataProps} {...props} data-nth="next" data-testid="nextjs-server-side-target">
      {children}
    </Tag>
  );
}

/**
 * @example
 * ```tsx
 * <NextJsSSGThemeSwitcher />
 * ```
 */
export function NextJsSSGThemeSwitcher(props: NextJsSSRThemeSwitcherProps) {
  return sharedServerComponentRenderer(props, "div");
}

/** For naming consistancy, clarity, and minimizing API updates */
export { NextJsSSGThemeSwitcher as NextJsServerTarget };

export interface ServerSideWrapperProps extends NextJsSSRThemeSwitcherProps {
  /** @defaultValue 'html' */
  tag?: keyof JSX.IntrinsicElements;
}

/**
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
