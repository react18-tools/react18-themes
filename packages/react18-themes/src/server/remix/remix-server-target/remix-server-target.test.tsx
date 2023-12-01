import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { RemixServerTarget } from "./remix-server-target";

describe.concurrent("remix-server-target", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<RemixServerTarget />);
		expect(screen.getByTestId("remix-server-target-h1").textContent).toBe("remix-server-target");
	});
});
