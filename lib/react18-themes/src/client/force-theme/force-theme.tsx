"use client";
import * as React from "react";
import { useEffect } from "react";
import { useTheme } from "../../store";

export interface ForceThemeProps {
	theme: string;
}

/**
 * @example
 * Force theme on a page
 * <ForceTheme theme="my-theme" />
 */

export function ForceTheme(props: ForceThemeProps) {
	const [setForcedTheme] = useTheme(state => [state.setForcedTheme]);
	useEffect(() => {
		setForcedTheme(props.theme);
		return () => {
			setForcedTheme(undefined);
		};
	}, [props.theme, setForcedTheme]);
	return null;
}
