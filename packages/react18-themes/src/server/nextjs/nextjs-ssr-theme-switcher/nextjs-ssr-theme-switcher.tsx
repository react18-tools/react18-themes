import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import type { ColorSchemeType, ThemeStoreType } from "../../../store";
import { resolveThemeFromColorScheme } from "../../../utils";

export type ForcedPage = [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
	children?: ReactNode;
	/** @default 'div' */
	tag?: keyof JSX.IntrinsicElements;
	forcedPages?: ForcedPage[];
}

/**
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 */
export function NextJsSSRThemeSwitcher({ children, tag, forcedPages, ...props }: NextJsSSRThemeSwitcherProps) {
	const Tag: keyof JSX.IntrinsicElements = tag || "div";

	const state = cookies().get("react18-themes")?.value;

	const path = headers().get("referer");
	const forcedPageData = forcedPages?.find(forcedPage => path?.match(forcedPage[0]));

	const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
	const isSystemDark = cookies().get("data-color-scheme-system")?.value === "dark";
	const { dataTheme, dataColorScheme } =
		forcedPageData === undefined
			? getTheme(themeState, isSystemDark)
			: getForcedPageTheme(themeState, forcedPageData, isSystemDark);

	const dataProps: { "data-theme"?: string; "data-color-scheme"?: ColorSchemeType } = {};
	if (dataTheme !== undefined) dataProps["data-theme"] = dataTheme;
	if (dataColorScheme !== undefined) dataProps["data-color-scheme"] = dataColorScheme;

	return (
		// @ts-expect-error -> svg props and html element props conflict
		<Tag id="react18-themes" {...dataProps} {...props} data-testid="nextjs-ssr-theme-switcher">
			{children}
		</Tag>
	);
}

interface Theme {
	dataTheme?: string;
	dataColorScheme?: ColorSchemeType;
}

function getTheme(themeState: ThemeStoreType | undefined, isSystemDark: boolean): Theme {
	if (!themeState) return {};
	const dataTheme = resolveThemeFromColorScheme(themeState, isSystemDark);
	return { dataTheme, dataColorScheme: themeState.colorSchemePref };
}

function getForcedPageTheme(
	themeState: ThemeStoreType | undefined,
	forcedPageData: ForcedPage,
	isSystemDark: boolean,
): Theme {
	const dataColorScheme =
		forcedPageData[1].colorScheme === undefined ? themeState?.colorSchemePref : forcedPageData[1].colorScheme;

	let dataTheme;
	if (forcedPageData[1].theme) {
		dataTheme = forcedPageData[1].theme;
	} else if (dataColorScheme !== undefined && themeState !== undefined) {
		dataTheme = resolveThemeFromColorScheme({ ...themeState, colorSchemePref: dataColorScheme }, isSystemDark);
	}
	return { dataTheme, dataColorScheme };
}
