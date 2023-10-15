"use client";
import type { HTMLProps } from "react";

export function Logo(props: HTMLProps<HTMLElement>) {
	/** Default to React18 Themes variant for local server - assuming http:// schema for local and https:// for production */
	const variant = location.origin.startsWith("https")
		? location.origin.split("://")[1].split(".")[0]
		: "react18-themes";
	return <code {...props}>{variant}</code>;
}
