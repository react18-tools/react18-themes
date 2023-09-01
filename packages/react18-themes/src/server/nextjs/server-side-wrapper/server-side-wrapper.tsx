import type { HTMLProps, ReactNode } from "react";
import { cookies } from "next/headers";
import * as React from "react";

type ServerSideWrapperProps = {
	children: ReactNode;
	tag?: keyof JSX.IntrinsicElements;
} & HTMLProps<HTMLElement>;

/**
 * # ServerSideWrapper
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 */
export function ServerSideWrapper({ children, tag, ...props }: ServerSideWrapperProps) {
	const dataTheme = cookies().get("data-theme")?.value || "";
	const Tag: keyof JSX.IntrinsicElements = tag || "html";
	return (
		// @ts-expect-error -> svg props and html element props conflict
		<Tag data-theme={dataTheme} {...props}>
			{children}
		</Tag>
	);
}
