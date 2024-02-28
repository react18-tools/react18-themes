import * as React from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DEFAULT_ID, type ColorSchemeType, type ThemeStoreType } from "../../../constants";
import { getDataProps, parseState, resolveTheme } from "../../../utils";
import { UpdateProps } from "../../../client";

interface ForcedPage {
  pathMatcher: RegExp | string;
  themes: { theme?: string; colorScheme?: ColorSchemeType };
}

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
 * import and export this function from your Remix app
 */
export function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return json({});
  const state = parseCookie(cookieHeader, DEFAULT_ID);
  const themeState = state ? parseState(state) : undefined;
  const resolvedData = resolveTheme(themeState);
  return json(resolvedData);
}

/**
 *
 * @example
 * <RemixServerTarget />
 */
export function RemixServerTarget({ children, tag, forcedPages, styles, ...props }: RemixServerTargetProps) {
  const Tag: keyof JSX.IntrinsicElements = tag || "div";

  const resolvedData = useLoaderData<typeof loader>() as UpdateProps;
  const dataProps = getDataProps(resolvedData, styles);

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id={DEFAULT_ID} {...dataProps} {...props} data-testid="remix-server-target">
      {children}
    </Tag>
  );
}

function parseCookie(cookieHeader: string, name: string) {
  const cookiePrefix = `${name}=`;
  return (
    cookieHeader
      .split(";")
      .filter(cookie => cookie.trim().startsWith(cookiePrefix))[0]
      .trim()
      .replace(cookiePrefix, "") || "{}"
  );
}
