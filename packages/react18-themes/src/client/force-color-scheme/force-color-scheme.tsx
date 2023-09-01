import * as React from "react";

interface ForceColorSchemeProps {
	children?: React.ReactNode;
}

/**
 * # ForceColorScheme
 * Force color scheme on a page
 */
export function ForceColorScheme({ children }: ForceColorSchemeProps) {
	return (
		<div>
			<h1 data-testid="force-color-scheme-h1">ForceColorScheme</h1>
			{children}
		</div>
	);
}
