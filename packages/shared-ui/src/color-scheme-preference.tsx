"use client";
import type { ColorSchemeType } from "react18-themes";
import { useTheme } from "react18-themes";
import styles from "./page.module.css";

const colorSchemes: ColorSchemeType[] = ["", "system", "light", "dark"];

export function ColorSchemePreference() {
	const [colorSchemePref, setColorSchemePref] = useTheme(state => [
		state.colorSchemePref,
		state.setColorSchemePref,
	]);
	return (
		<p>
			ColorScheme Preference{" "}
			<select
				className={styles.active}
				onChange={e => setColorSchemePref(e.target.value as ColorSchemeType)}
				value={colorSchemePref}>
				{colorSchemes.map(theme => (
					<option key={theme} value={theme}>
						{theme}
					</option>
				))}
			</select>
		</p>
	);
}
