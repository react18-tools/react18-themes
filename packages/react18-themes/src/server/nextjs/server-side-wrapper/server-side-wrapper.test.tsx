import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerSideWrapper } from "./server-side-wrapper";

describe.concurrent("server-side-wrapper", () => {
	afterEach(cleanup);

	test("test tag", ({ expect }) => {
		render(<ServerSideWrapper>ServerSideWrapper</ServerSideWrapper>);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("HTML");
	});
	test("test custom tag", ({ expect }) => {
		render(<ServerSideWrapper tag="div">ServerSideWrapper</ServerSideWrapper>);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("DIV");
	});
});
