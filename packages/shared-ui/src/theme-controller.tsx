import ColorSchemePreference from "./color-scheme-preference";
import DarkThemeSelector from "./dark-theme-selector";
import LightThemeSelector from "./light-theme-selector";
import styles from "./page.module.css";
import ThemeSelector from "./theme-selector";

export function ThemeController() {
	return (
		<div className={[styles.center, styles.prefs].join(" ")}>
			<div>
				<ColorSchemePreference />
				<ThemeSelector />
			</div>
			<div>
				<DarkThemeSelector />
				<LightThemeSelector />
			</div>
		</div>
	);
}
