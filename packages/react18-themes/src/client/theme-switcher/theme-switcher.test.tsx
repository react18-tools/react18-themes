import { act, cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ThemeSwitcher } from "./theme-switcher";
import { useTheme } from "../../store";

/** Test if proper data-theme is added to documentElement
 * concurrency is not feasible because of global store conflicts
 */
describe("theme-switcher", () => {
	afterEach(cleanup);

	test("Test first time load based on media query", ({ expect }) => {
		window.media = "dark";
		render(<ThemeSwitcher />);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
		window.media = "light";
		render(<ThemeSwitcher />);
		expect(document.documentElement.getAttribute("data-theme")).toBe("");
	});

	test("Test defaultDark and defaultLight themes", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setDarkTheme("dark1"));
		await act(() => result.current.setLightTheme("light1"));
		window.media = "dark";
		render(<ThemeSwitcher />);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark1");
		window.media = "light";
		render(<ThemeSwitcher />);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light1");
	});

	// colorScheme has higher preference
	test("test themes with colorScheme=''", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setColorSchemePref(""));
		await act(() => result.current.setTheme("blue"));
		await act(() => render(<ThemeSwitcher />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("blue");
	});

	test("test color scheme preference", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setColorSchemePref("light"));
		await act(() => result.current.setLightTheme("yellow"));
		await act(() => result.current.setTheme("blue"));
		await act(() => render(<ThemeSwitcher />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("yellow");
		await act(() => result.current.setDarkTheme("dark-blue"));
		await act(() => result.current.setColorSchemePref("dark"));
		await act(() => render(<ThemeSwitcher />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark-blue");
	});

	test("test forcedTheme", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setForcedTheme("forced1"));
		await act(() => result.current.setForcedColorScheme("dark"));
		await act(() => result.current.setColorSchemePref("light"));
		await act(() => result.current.setTheme("f1"));
		await act(() => render(<ThemeSwitcher />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("forced1");
	});

	test("forced colorScheme only", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setForcedTheme(""));
		await act(() => result.current.setForcedColorScheme("dark"));
		await act(() => result.current.setColorSchemePref("light"));
		await act(() => result.current.setTheme("f1"));
		await act(() => result.current.setLightTheme("yellow"));
		await act(() => result.current.setDarkTheme("black"));
		await act(() => render(<ThemeSwitcher />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("");
		await act(() => result.current.setForcedTheme(undefined));
		expect(document.documentElement.getAttribute("data-theme")).toBe("black");
	});

	test("forced theme prop", async ({ expect }) => {
		await act(() => render(<ThemeSwitcher forcedTheme="theme1" />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("theme1");
	});

	test("forced colorScheme prop", async ({ expect }) => {
		// global state is continuing from previous testss
		await act(() => render(<ThemeSwitcher forcedColorScheme="light" />));
		expect(document.documentElement.getAttribute("data-theme")).toBe("yellow");
	});
});
