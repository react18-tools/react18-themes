import { ThemeStoreType } from "./store";

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
