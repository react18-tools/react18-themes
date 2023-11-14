import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";

export interface ThemeSwitcherProps {
	forcedTheme?: string;
	forcedColorScheme?: ColorSchemeType;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
	useThemeSwitcher(props);
	return null;
}

export function useThemeSwitcher(props: ThemeSwitcherProps) {
	const { theme, darkTheme, lightTheme, colorSchemePref, forcedTheme, forcedColorScheme } = useTheme();

	const resolvedForcedTheme = props.forcedTheme === undefined ? forcedTheme : props.forcedTheme;
	const resolvedForcedColorScheme = props.forcedColorScheme === undefined ? forcedColorScheme : props.forcedColorScheme;
	const colorScheme = resolvedForcedColorScheme === undefined ? colorSchemePref : resolvedForcedColorScheme;

	useEffect(() => {
		const media = matchMedia("(prefers-color-scheme: dark)");
		const updateTheme = () => {
			const restoreTransitions = disableAnimation();

			const newTheme =
				resolvedForcedTheme !== undefined
					? resolvedForcedTheme
					: resolveThemeFromColorScheme({ media, colorScheme, darkTheme, lightTheme }) || theme;

			const isForced = Boolean(resolvedForcedColorScheme) || resolvedForcedTheme !== undefined;
			updateDOM({ newTheme, colorScheme, darkTheme, lightTheme, media, isForced });

			restoreTransitions();
		};
		media.addEventListener("change", updateTheme);
		updateTheme();
		return () => {
			media.removeEventListener("change", updateTheme);
		};
	}, [theme, darkTheme, lightTheme, resolvedForcedTheme, colorSchemePref, colorScheme, resolvedForcedColorScheme]);
}

export interface ResolveThemeFromColorSchemeProps {
	media: MediaQueryList;
	colorScheme: ColorSchemeType;
	darkTheme: string;
	lightTheme: string;
}

function resolveThemeFromColorScheme({ media, colorScheme, darkTheme, lightTheme }: ResolveThemeFromColorSchemeProps) {
	switch (colorScheme) {
		case "system":
			return media.matches ? darkTheme : lightTheme;
		case "dark":
			return darkTheme;
		case "light":
			return lightTheme;
		default:
			return undefined;
	}
}

interface UpdateDOMProps extends ResolveThemeFromColorSchemeProps {
	newTheme: string;
	isForced: boolean /** Do not set cookies for forced pages -  */;
}

function updateDOM({ newTheme, colorScheme, darkTheme, lightTheme, media, isForced }: UpdateDOMProps) {
	document.documentElement.setAttribute("data-theme", newTheme);
	document.documentElement.setAttribute("data-color-scheme", colorScheme);

	/** update derived values only for non-forced pages */
	if (!isForced) {
		document.cookie = `data-theme=${newTheme}`;
		document.cookie = `data-color-scheme-pref=${colorScheme}`;
	}
	document.cookie = `data-theme-dark=${darkTheme}`;
	document.cookie = `data-theme-light=${lightTheme}`;
	document.cookie = `data-color-scheme=${media.matches ? "dark" : "light"}`;
}

// todo: customizable transition time
const disableAnimation = () => {
	const css = document.createElement("style");
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
		),
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();
		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};
