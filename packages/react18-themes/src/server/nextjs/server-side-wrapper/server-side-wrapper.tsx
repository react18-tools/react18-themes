import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import * as React from "react";
import type { ColorSchemeType } from "../../../store";

export type ForcedPage = [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

interface ServerSideWrapperProps extends HTMLProps<HTMLElement> {
	children: ReactNode;
	tag?: keyof JSX.IntrinsicElements;
	forcedPages?: ForcedPage[];
}

/**
 * # ServerSideWrapper
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 */
export function ServerSideWrapper({ children, tag, forcedPages, ...props }: ServerSideWrapperProps) {
	const Tag: keyof JSX.IntrinsicElements = tag || "html";
	const dataTheme = cookies().get("data-theme")?.value || "";
	const dataColorSchemePref = cookies().get("data-color-scheme-pref")?.value || "";

	const path = headers().get("x-invoke-path");
	const forcedPageData = forcedPages?.find(forcedPage => path?.match(forcedPage[0]));
	const isForcedPage = forcedPageData !== undefined;

	const forcedTheme = isForcedPage ? getForcedPageTheme(forcedPageData) : undefined;

	return (
		// @ts-expect-error -> svg props and html element props conflict
		<Tag
			data-color-scheme={dataColorSchemePref}
			data-theme={forcedTheme === undefined ? dataTheme : forcedTheme}
			{...props}
			data-testid="server-side-wrapper">
			{children}
		</Tag>
	);
}

function getForcedPageTheme(forcedPageData: ForcedPage): string | undefined {
	const dataColorScheme = cookies().get("data-color-scheme")?.value || "";
	const dataThemeDark = cookies().get("data-theme-dark")?.value || "";
	const dataThemeLight = cookies().get("data-theme-light")?.value || "";

	let forcedTheme;
	if (forcedPageData[1].theme) {
		forcedTheme = forcedPageData[1].theme;
	} else if (forcedPageData[1].colorScheme !== "") {
		const colorScheme = forcedPageData[1].colorScheme === "system" ? dataColorScheme : forcedPageData[1].colorScheme;
		forcedTheme = colorScheme === "dark" ? dataThemeDark : dataThemeLight;
	}
	return forcedTheme;
}
