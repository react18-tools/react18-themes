import * as React from "react";
import { useTheme } from "../../store";

interface ColorSwitchProps {
	size?: number;
}

/**
 * # ColorSwitch
 * Color switch button to quickly set user preference
 */
export function ColorSwitch({ size = 25 }: ColorSwitchProps) {
	const [colorSchemePref, setColorSchemePref] = useTheme(state => [state.colorSchemePref, state.setColorSchemePref]);
	const toggleColorScheme = () => {
		switch (colorSchemePref) {
			case "":
			case "system":
				setColorSchemePref("dark");
				break;
			case "dark":
				setColorSchemePref("light");
				break;
			case "light":
				setColorSchemePref("system");
		}
	};
	return (
		<div
			className="react18-themes--color-switch"
			onClick={toggleColorScheme}
			onKeyUp={e => e.key === "Enter" && toggleColorScheme()}
			role="button"
			// @ts-expect-error -- setting custom attribute
			style={{ "--size": `${size}px` }}
			tabIndex={0}
		/>
	);
}
