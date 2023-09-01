import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForkMe } from "./fork-me";

describe.concurrent("fork-me", () => {
	afterEach(cleanup);

	test("Smoke test", async ({ expect }) => {
		const component = render(
			<ForkMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />,
		);
		expect(component.container.textContent).toBe("Fork Me on GitHub");
	});

	test("Custom text", async ({ expect }) => {
		const text = "Star me on GitHub";
		const component = render(
			<ForkMe gitHubUrl="https://github.com/mayank1513/turborepo-template" text={text} />,
		);
		expect(component.container.textContent).toBe(text);
	});
});
