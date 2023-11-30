import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { NextJsSSRThemeSwitcher, ServerSideWrapper } from "./nextjs-ssr-theme-switcher";

describe("nextjs-ssr-theme-switcher", () => {
	afterEach(cleanup);

	beforeEach(() => {
		globalThis.cookies = {
			"react18-themes": {
				value: JSON.stringify({
					theme: "yellow",
					darkTheme: "dark-blue",
					lightTheme: "light-yellow",
					colorSchemePref: "dark",
				}),
			},
			"data-color-scheme-system": { value: "dark" },
		};
		globalThis.path = "";
	});

	test("test default tag", ({ expect }) => {
		globalThis.cookies = {};
		render(<NextJsSSRThemeSwitcher />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").tagName).toBe("DIV");
	});
	test("test default tag for ServerSideWrapper", ({ expect }) => {
		render(<ServerSideWrapper />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").tagName).toBe("HTML");
	});
	test("test custom tag", ({ expect }) => {
		render(<NextJsSSRThemeSwitcher tag="main" />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").tagName).toBe("MAIN");
	});
	test("forced theme", ({ expect }) => {
		globalThis.path = "/themed-page/dark1";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/themed-page\/dark1/, { theme: "dark1" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-theme")).toBe("dark1");
	});

	/** test cookies and forced pages */
	test("forced color scheme dark", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/dark";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/dark/, { colorScheme: "dark" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-theme")).toBe("dark-blue");
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-color-scheme")).toBe("dark");
	});
	test("forced color scheme light", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/light";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/light/, { colorScheme: "light" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-theme")).toBe("light-yellow");
	});
	test("forced color scheme system", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/system";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme\/system/, { colorScheme: "system" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-theme")).toBe("dark-blue");
	});
	test("force disable color scheme", ({ expect }) => {
		globalThis.path = "/forced-color-scheme";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-theme")).toBe("yellow");
	});
	/** forced page but no cookies */
	test("force disable color scheme", ({ expect }) => {
		globalThis.cookies = {};
		globalThis.path = "/forced-color-scheme";
		render(<NextJsSSRThemeSwitcher forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]} />);
		expect(screen.getByTestId("nextjs-ssr-theme-switcher").getAttribute("data-color-scheme")).toBe("");
	});
});
