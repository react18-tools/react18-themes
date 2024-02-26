import * as React from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DEFAULT_ID, type ColorSchemeType, type ThemeStoreType } from "../../../constants";
import { getDataProps, parseState, resolveTheme } from "../../../utils";

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
  const dataProps = getDataProps(resolvedData);
  return json(dataProps);
}

/**
 *
 * @example
 * <RemixServerTarget />
 */
export function RemixServerTarget({ children, tag, forcedPages, ...props }: RemixServerTargetProps) {
  const Tag: keyof JSX.IntrinsicElements = tag || "div";

  const dataProps = useLoaderData<typeof loader>();

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
