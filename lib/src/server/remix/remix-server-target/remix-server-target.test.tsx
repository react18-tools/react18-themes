import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { RemixServerTarget } from "./remix-server-target";

describe.concurrent("remix-server-target", () => {
  afterEach(cleanup);

  test("renders without errors", () => {
    render(<RemixServerTarget />);
  });
});
