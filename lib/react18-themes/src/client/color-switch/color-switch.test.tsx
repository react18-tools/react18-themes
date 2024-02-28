import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ColorSwitch } from "./color-switch";

describe("color-switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", async ({ expect }) => {
    const hook = renderHook(() => useTheme());
    act(() => hook.result.current.setColorSchemePref(""));
    render(<ColorSwitch />);
    const element = screen.getByTestId("color-switch");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("dark");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("light");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("system");
    await act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("dark");
  });
});
