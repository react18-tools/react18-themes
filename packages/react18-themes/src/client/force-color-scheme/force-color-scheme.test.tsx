import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceColorScheme } from "./force-color-scheme";
import { useTheme } from "../../store";

describe.concurrent("force-color-scheme", () => {
	afterEach(cleanup);
	/** Test only the things that this component is responsible for - chanding state*/
	test("Force theme with force color scheme", async ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		await act(() => result.current.setForcedColorScheme("light"));
		await act(() => render(<ForceColorScheme colorScheme="dark" />));
		expect(result.current.forcedColorScheme).toBe("dark");
	});
});
