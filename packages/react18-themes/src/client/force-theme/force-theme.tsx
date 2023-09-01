import * as React from "react";

interface ForceThemeProps {
	children?: React.ReactNode;
}

/**
 * # ForceTheme
 * for pages who want to force a specific theme irrespective of global settings
 */
export function ForceTheme({ children }: ForceThemeProps) {
	return (
		<div>
			<h1 data-testid="force-theme-h1">ForceTheme</h1>
			{children}
		</div>
	);
}
