import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerSideWrapper } from "./server-side-wrapper";

describe.concurrent("server-side-wrapper", () => {
	afterEach(cleanup);

	test.todo("check if h1 heading exists", async ({ expect }) => {
		render(<ServerSideWrapper>ServerSideWrapper</ServerSideWrapper>);
		expect(screen.getByTestId("server-side-wrapper-h1").textContent).toBe("ServerSideWrapper");
	});
});
