import * as React from "react";

interface RemixServerTargetProps {
	children?: React.ReactNode;
}

/**
 * 
 * @example
 * <RemixServerTarget />
 */
export function RemixServerTarget({ children }: RemixServerTargetProps) {
	return (
		<div>
			<h1 data-testid="remix-server-target-h1">remix-server-target</h1>
			{children}
		</div>
	);
}
