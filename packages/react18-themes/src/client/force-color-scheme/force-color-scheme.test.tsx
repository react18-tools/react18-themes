import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceColorScheme } from "./force-color-scheme";

describe.concurrent("force-color-scheme", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", async ({ expect }) => {
		render(<ForceColorScheme />);
		expect(screen.getByTestId("force-color-scheme-h1").textContent).toBe("ForceColorScheme");
	});
});
