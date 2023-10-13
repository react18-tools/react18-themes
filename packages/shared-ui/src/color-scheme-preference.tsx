"use client";
import type { ColorSchemeType } from "react18-themes";
import { useTheme } from "react18-themes";
import type { ChangeEvent } from "react";
import styles from "./page.module.css";
import { Select } from "./select";

const colorSchemes: ColorSchemeType[] = ["", "system", "light", "dark"];

export function ColorSchemePreference() {
	const [colorSchemePref, setColorSchemePref] = useTheme(state => [state.colorSchemePref, state.setColorSchemePref]);
	const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e =>
		setColorSchemePref(e.target.value as ColorSchemeType);

	return (
		<p>
			ColorScheme Preference{" "}
			<Select className={styles.active} onChange={handleChange} options={colorSchemes} value={colorSchemePref} />
		</p>
	);
}
