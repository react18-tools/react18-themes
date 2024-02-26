import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { DEFAULT_ID } from "../../../constants";
import { encodeState } from "../../../utils";
import { NextJsSSGThemeSwitcher, ServerSideWrapper } from ".";

describe("nextjs-server-side-target", () => {
  afterEach(cleanup);

  beforeEach(() => {
    globalThis.cookies = {
      [DEFAULT_ID]: {
        value: encodeState({
          theme: "yellow",
          darkTheme: "dark-blue",
          lightTheme: "light-yellow",
          colorSchemePref: "dark",
          systemColorScheme: "dark",
        }),
      },
      "data-color-scheme-system": { value: "dark" },
    };
    globalThis.path = "";
  });

  test("test default tag", ({ expect }) => {
    globalThis.cookies = {};
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
  test("forced theme", ({ expect }) => {
    globalThis.path = "/themed-page/dark1";
    render(
      <NextJsSSGThemeSwitcher forcedPages={[{ pathMatcher: /themed-page\/dark1/, props: { forcedTheme: "dark1" } }]} />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-theme")).toBe("dark1");
  });

  /** test cookies and forced pages */
  test("forced color scheme dark", ({ expect }) => {
    globalThis.path = "/forced-color-scheme/dark";
    render(
      <NextJsSSGThemeSwitcher
        forcedPages={[{ pathMatcher: /forced-color-scheme\/dark/, props: { forcedColorScheme: "dark" } }]}
      />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-theme")).toBe("dark-blue");
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-color-scheme")).toBe("dark");
  });
  test("forced color scheme light", ({ expect }) => {
    globalThis.path = "/forced-color-scheme/light";
    render(
      <NextJsSSGThemeSwitcher
        forcedPages={[{ pathMatcher: /forced-color-scheme\/light/, props: { forcedColorScheme: "light" } }]}
      />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-theme")).toBe("light-yellow");
  });
  test("forced color scheme system", ({ expect }) => {
    globalThis.path = "/forced-color-scheme/system";
    render(
      <NextJsSSGThemeSwitcher
        forcedPages={[{ pathMatcher: /forced-color-scheme\/system/, props: { forcedColorScheme: "system" } }]}
      />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-theme")).toBe("dark-blue");
  });
  test("force disable color scheme", ({ expect }) => {
    globalThis.path = "/forced-color-scheme";
    render(
      <NextJsSSGThemeSwitcher
        forcedPages={[{ pathMatcher: /forced-color-scheme$/, props: { forcedColorScheme: "" } }]}
      />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-theme")).toBe("yellow");
  });
  /** forced page but no cookies */
  test("force disable color scheme - no cookies", ({ expect }) => {
    globalThis.cookies = {};
    globalThis.path = "/forced-color-scheme";
    render(
      <NextJsSSGThemeSwitcher
        forcedPages={[{ pathMatcher: /forced-color-scheme$/, props: { forcedColorScheme: "" } }]}
      />,
    );
    expect(screen.getByTestId("nextjs-server-side-target").getAttribute("data-csp")).toBe("");
  });
});
