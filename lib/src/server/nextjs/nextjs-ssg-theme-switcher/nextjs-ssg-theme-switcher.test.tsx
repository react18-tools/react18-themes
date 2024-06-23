import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { NextJsSSGThemeSwitcher, ServerSideWrapper } from ".";

describe("nextjs-server-side-target", () => {
  afterEach(cleanup);

  test("test default tag", ({ expect }) => {
    render(<NextJsSSGThemeSwitcher />);
    expect(screen.getByTestId("nextjs-server-side-target").tagName).toBe("DIV");
  });
  test("test default tag for ServerSideWrapper", ({ expect }) => {
    render(<ServerSideWrapper />);
    expect(screen.getByTestId("nextjs-server-side-target").tagName).toBe("HTML");
  });
  test("test custom tag", ({ expect }) => {
    render(<NextJsSSGThemeSwitcher tag="main" />);
    expect(screen.getByTestId("nextjs-server-side-target").tagName).toBe("MAIN");
  });
});
