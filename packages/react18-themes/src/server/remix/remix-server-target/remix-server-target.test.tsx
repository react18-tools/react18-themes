import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";
import { RemixServerTarget } from "./remix-server-target";

const RemixStub = createRemixStub([
	{
		path: "/",
		Component: RemixServerTarget,
		loader() {
			return json({ dataProps: { "data-theme": "dark", "data-color-scheme": "dark" } });
		},
	},
]);

describe.concurrent("remix-server-target", () => {
	afterEach(cleanup);

	test("", ({ expect }) => {
		render(<RemixStub />);
	});
});
