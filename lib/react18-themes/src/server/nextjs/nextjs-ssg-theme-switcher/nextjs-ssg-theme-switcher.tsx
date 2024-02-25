import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import type { ThemeStoreType } from "../../../store";
import { getDataProps, resolveTheme } from "../../../utils";
import type { ThemeSwitcherProps, UpdateProps } from "../../../client";

export type ForcedPage = { pathMatcher: RegExp | string; props: ThemeSwitcherProps };

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
  children?: ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  forcedPages?: ForcedPage[];
}

function sharedServerComponentRenderer(
  { children, tag, forcedPages, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;
  const state = cookies().get("react18-themes")?.value;

  const path = headers().get("referer");
  const forcedPageProps = forcedPages?.find(forcedPage => path?.match(forcedPage.pathMatcher))?.props;

  const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
  const isSystemDark = cookies().get("data-color-scheme-system")?.value === "dark";
  const resolvedData = resolveTheme(isSystemDark, themeState, forcedPageProps);
  const dataProps = getDataProps(resolvedData);

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id="react18-themes" {...dataProps} {...props} data-testid="nextjs-server-side-target">
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
