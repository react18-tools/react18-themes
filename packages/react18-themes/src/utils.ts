import type { ColorSchemeType, ThemeStoreType } from "./store";

export function resolveThemeFromColorScheme(state: ThemeStoreType, isSystemDark: boolean) {
	const { colorSchemePref, darkTheme, lightTheme, theme } = state;

	switch (colorSchemePref) {
		case "system":
			return isSystemDark ? darkTheme : lightTheme;
		case "dark":
			return darkTheme;
		case "light":
			return lightTheme;
		default:
			return theme;
	}
}

export interface Theme {
	dataTheme?: string;
	dataColorScheme?: ColorSchemeType;
}

export function getTheme(themeState: ThemeStoreType | undefined, isSystemDark: boolean): Theme {
	if (!themeState) return {};
	const dataTheme = resolveThemeFromColorScheme(themeState, isSystemDark);
	return { dataTheme, dataColorScheme: themeState.colorSchemePref };
}
