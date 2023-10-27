import * as React from "react";

interface ColorSwitchProps {
	children?: React.ReactNode;
}

/**
 * # ColorSwitch
 * Color switch button to quickly set user preference
 */
export function ColorSwitch({ children }: ColorSwitchProps) {
	return (
		<div>
			<h1 data-testid="color-switch-h1">color switch</h1>
			{children}
		</div>
	);
}
