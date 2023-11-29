import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { NextJsSSRThemeSwitcher } from "./nextjs-ssr-theme-switcher";

describe("server-side-wrapper", () => {
	afterEach(cleanup);

	test.concurrent("test tag", ({ expect }) => {
		render(
			<NextJsSSRThemeSwitcher>
				<body>ServerSideWrapper</body>
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("HTML");
	});
	test.concurrent("test custom tag", ({ expect }) => {
		render(<NextJsSSRThemeSwitcher tag="div">ServerSideWrapper</NextJsSSRThemeSwitcher>);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("DIV");
	});
	test.concurrent("forced theme", ({ expect }) => {
		globalThis.path = "/themed-page/dark1";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/themed-page\/dark1/, { theme: "dark1" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark1");
	});

	/** test cookies and forced pages */
	globalThis.cookies = {
		"data-theme-dark": { value: "dark-blue" },
		"data-theme-light": { value: "light-yellow" },
		"data-theme": { value: "yellow" },
		"data-color-scheme": { value: "dark" },
		"data-color-scheme-pref": { value: "dark" },
	};
	test("forced color scheme dark", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/dark";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/dark/, { colorScheme: "dark" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark-blue");
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-color-scheme")).toBe("dark");
	});
	test("forced color scheme light", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/light";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/light/, { colorScheme: "light" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("light-yellow");
	});
	test("forced color scheme system", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/system";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/system/, { colorScheme: "system" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark-blue");
	});
	test("force disable color scheme", ({ expect }) => {
		globalThis.path = "/forced-color-scheme";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("yellow");
	});
	/** forced page but no cookies */
	test("force disable color scheme", ({ expect }) => {
		globalThis.cookies = {};
		globalThis.path = "/forced-color-scheme";
		render(
			<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]} tag="div">
				ServerSideWrapper
			</NextJsSSRThemeSwitcher>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("");
	});
});
