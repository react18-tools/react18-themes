import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import type { ColorSchemeType, ThemeStoreType } from "../../../store";
import { resolveThemeFromColorScheme } from "../../../utils";
import { ThemeSwitcher } from "../../../client";

export type ForcedPage = [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
	children: ReactNode;
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
	/** Return early if no state is found */
	// @ts-expect-error -> svg props and html element props conflict
	if (!state) return <Tag {...props}>{children}</Tag>;

	const path = headers().get("referer");
	const forcedPageData = forcedPages?.find(forcedPage => path?.match(forcedPage[0]));

	const themeState = JSON.parse(state) as ThemeStoreType;
	const isSystemDark = cookies().get("data-color-scheme-system")?.value === "dark";
	const { dataTheme, dataColorScheme } =
		forcedPageData === undefined
			? getTheme(themeState, isSystemDark)
			: getForcedPageTheme(themeState, forcedPageData, isSystemDark);

	return (
		// @ts-expect-error -> svg props and html element props conflict
		<Tag
			id="react18-themes"
			data-color-scheme={dataColorScheme}
			data-theme={dataTheme}
			{...props}
			data-testid="server-side-wrapper">
			<ThemeSwitcher targetSelector="#react18-themes" />
			{children}
		</Tag>
	);
}

interface Theme {
	dataTheme: string;
	dataColorScheme: string;
}

function getTheme(themeState: ThemeStoreType, isSystemDark: boolean): Theme {
	const dataTheme = resolveThemeFromColorScheme(themeState, isSystemDark);
	return { dataTheme, dataColorScheme: themeState.colorSchemePref };
}

function getForcedPageTheme(themeState: ThemeStoreType, forcedPageData: ForcedPage, isSystemDark: boolean): Theme {
	const dataColorScheme =
		forcedPageData[1].colorScheme === undefined ? themeState.colorSchemePref : forcedPageData[1].colorScheme;

	let dataTheme;
	if (forcedPageData[1].theme) {
		dataTheme = forcedPageData[1].theme;
	} else {
		dataTheme = resolveThemeFromColorScheme({ ...themeState, colorSchemePref: dataColorScheme }, isSystemDark);
	}
	return { dataTheme, dataColorScheme };
}
