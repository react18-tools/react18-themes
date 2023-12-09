import * as React from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ColorSchemeType, ThemeStoreType } from "../../../store";
import { getTheme } from "../../../utils";

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
	const state = parseCookie(cookieHeader, "react18-themes");
	const isSystemDark = parseCookie(cookieHeader, "data-color-scheme-system") === "dark";
	const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
	const { dataTheme, dataColorScheme } = getTheme(themeState, isSystemDark);

	const dataProps: { "data-theme"?: string; "data-color-scheme"?: ColorSchemeType } = {};
	if (dataTheme !== undefined) dataProps["data-theme"] = dataTheme;
	if (dataColorScheme !== undefined) dataProps["data-color-scheme"] = dataColorScheme;

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
		<Tag id="react18-themes" {...dataProps} {...props} data-testid="remix-server-target">
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
