import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceTheme } from "./force-theme";

describe.concurrent("force-theme", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", async ({ expect }) => {
		render(<ForceTheme />);
		expect(screen.getByTestId("force-theme-h1").textContent).toBe("ForceTheme");
	});
});
