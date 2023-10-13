"use client";
import { useTheme } from "react18-themes";
import { useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";
import { Select } from "./select";

interface ThemeSelectorProps {
	scope: "" | "dark" | "light";
}

export function ThemeSelector({ scope }: ThemeSelectorProps) {
	const { colorSchemePref, theme, setTheme } = useThemeStates(scope);
	const themes = useMemo(() => {
		switch (scope) {
			case "":
				return ["auto", ...lightThemes, ...darkThemes];
			case "dark":
				return darkThemes;
			case "light":
				return lightThemes;
		}
	}, [scope]);

	useEffect(() => {
		setTheme(themes[0]);
	}, [setTheme, themes]);

	let className = colorSchemePref ? "" : styles.active;

	/** handle className for dark and light themes */
	if (scope !== "") {
		if (colorSchemePref === scope) className = styles.active;
		else className = colorSchemePref === "system" ? styles[scope] : "";
	}
	const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e => setTheme(e.target.value);

	return (
		<p>
			Select {scope} theme <Select className={className} onChange={handleChange} options={themes} value={theme} />
		</p>
	);
}

function useThemeStates(scope: ThemeSelectorProps["scope"]) {
	const [colorSchemePref, theme, setTheme] = useTheme(state => {
		switch (scope) {
			case "":
				return [state.colorSchemePref, state.theme, state.setTheme];
			case "dark":
				return [state.colorSchemePref, state.darkTheme, state.setDarkTheme];
			case "light":
				return [state.colorSchemePref, state.lightTheme, state.setLightTheme];
		}
	});
	return { colorSchemePref, theme, setTheme };
}
