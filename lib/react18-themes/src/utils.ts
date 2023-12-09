import type { DataProps, ThemeSwitcherProps, UpdateProps } from "./client";
import type { ThemeStoreType } from "./store";

export function resolveTheme(isSystemDark: boolean, state?: ThemeStoreType, props?: ThemeSwitcherProps): UpdateProps {
	const resolvedForcedTheme = props?.forcedTheme === undefined ? state?.forcedTheme : props.forcedTheme;
	const resolvedForcedColorScheme =
		props?.forcedColorScheme === undefined ? state?.forcedColorScheme : props.forcedColorScheme;
	const resolvedColorSchemePref =
		(resolvedForcedColorScheme === undefined ? state?.colorSchemePref : resolvedForcedColorScheme) || "";

	let resolvedColorScheme: "dark" | "light" = isSystemDark ? "dark" : "light";
	let resolvedTheme = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;

	if (resolvedForcedTheme === undefined)
		switch (resolvedColorSchemePref) {
			case "system":
				resolvedTheme = (isSystemDark ? state?.darkTheme : state?.lightTheme) || "";
				break;
			case "dark":
				[resolvedTheme, resolvedColorScheme] = [state?.darkTheme || "", "dark"];
				break;
			case "light":
				[resolvedTheme, resolvedColorScheme] = [state?.lightTheme || "", "light"];
				break;
			default:
		}

	const th = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;
	return { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th };
}

export function getDataProps(resolvedData?: UpdateProps) {
	const dataProps: DataProps = { className: "" };
	if (resolvedData?.resolvedColorScheme !== undefined) {
		dataProps["data-color-scheme"] = resolvedData.resolvedColorScheme;
		dataProps.className = resolvedData.resolvedColorScheme;
	}
	if (resolvedData?.resolvedTheme !== undefined) {
		dataProps["data-theme"] = resolvedData.resolvedTheme;
		dataProps.className += `theme-${resolvedData.resolvedTheme}`;
	}
	if (resolvedData?.th) {
		dataProps["data-th"] = resolvedData.th;
		dataProps.className += ` th-${resolvedData.th}`;
	}
	if (resolvedData?.resolvedColorSchemePref !== undefined) {
		dataProps["data-csp"] = resolvedData.resolvedColorSchemePref;
		dataProps.className += ` csp-${resolvedData.resolvedColorSchemePref}`;
	}
	return dataProps;
}

export function getResolvedTheme() {
	return document.documentElement.getAttribute("data-theme");
}

export function getResolvedColorScheme() {
	return document.documentElement.getAttribute("data-color-scheme");
}
