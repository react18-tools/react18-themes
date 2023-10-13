"use client";
import { useTheme } from "react18-themes";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";
import { useEffect, useMemo } from "react";

interface ThemeSelectorProps {
	scope: "" | "dark" | "light";
}

export function ThemeSelector({ scope }: ThemeSelectorProps) {
	const [colorSchemePref, theme, setTheme] = useTheme(state => {
		let theme = state.theme;
		let setTheme = state.setTheme;
		if (scope !== "") {
			theme = scope === "dark" ? state.darkTheme : state.lightTheme;
			setTheme = scope === "dark" ? state.setDarkTheme : state.setLightTheme;
		}
		return [state.colorSchemePref, theme, setTheme];
	});
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
	}, []);
	let className = colorSchemePref ? "" : styles.active;
	if (scope !== "") {
		if (colorSchemePref === scope) className = styles.active;
		else className = colorSchemePref === "system" ? styles[scope] : "";
	}
	return (
		<p>
			Select {scope} theme{" "}
			<select value={theme} onChange={e => setTheme(e.target.value)} className={className}>
				{themes.map(theme => (
					<option key={theme} value={theme}>
						{theme}
					</option>
				))}
			</select>
		</p>
	);
}
