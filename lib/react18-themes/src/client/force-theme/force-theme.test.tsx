import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ForceTheme } from "./force-theme";

describe.concurrent("force-theme", () => {
  afterEach(cleanup);
  /** Test only the things that this component is responsible for - changing state*/
  test("Force theme with force color scheme", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    const { unmount } = await act(() => render(<ForceTheme theme="yellow" />));
    expect(result.current.forcedTheme).toBe("yellow");
    act(() => unmount());
    expect(result.current.forcedTheme).toBe(undefined);
  });
});
