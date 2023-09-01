import { cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../store";
import { ForceTheme } from "./force-theme";

describe.concurrent("force-color-scheme", () => {
	afterEach(cleanup);
	/** Test only the things that this component is responsible for - chanding state*/
	test("Force theme with force color scheme", ({ expect }) => {
		const { result } = renderHook(() => useTheme());
		result.current.setForcedTheme("red");
		render(<ForceTheme theme="yellow" />);
		expect(result.current.forcedTheme).toBe("yellow");
	});
});
