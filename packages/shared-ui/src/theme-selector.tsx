"use client";
import { useTheme } from "react18-themes";
import { useEffect, useMemo } from "react";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";

interface ThemeSelectorProps {
	scope: "" | "dark" | "light";
}

export function ThemeSelector({ scope }: ThemeSelectorProps) {
	const [colorSchemePref, theme, setTheme] = useTheme(state => {
		let _theme = state.theme;
		let _setTheme = state.setTheme;
		if (scope !== "") {
			_theme = scope === "dark" ? state.darkTheme : state.lightTheme;
			_setTheme = scope === "dark" ? state.setDarkTheme : state.setLightTheme;
		}
		return [state.colorSchemePref, _theme, _setTheme];
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
	}, [setTheme, themes]);
	let className = colorSchemePref ? "" : styles.active;
	if (scope !== "") {
		if (colorSchemePref === scope) className = styles.active;
		else className = colorSchemePref === "system" ? styles[scope] : "";
	}
	return (
		<p>
			Select {scope} theme{" "}
			<select className={className} onChange={e => setTheme(e.target.value)} value={theme}>
				{themes.map(_theme => (
					<option key={_theme} value={_theme}>
						{_theme}
					</option>
				))}
			</select>
		</p>
	);
}
