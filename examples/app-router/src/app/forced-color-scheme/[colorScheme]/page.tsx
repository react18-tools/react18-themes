import type { ColorSchemeType } from "react18-themes";
import { ForceColorScheme } from "react18-themes";

interface PageWithForcedColorSchemeProps {
  params: { colorScheme: ColorSchemeType };
}

export default function PageWithForcedColorScheme({
  params: { colorScheme },
}: PageWithForcedColorSchemeProps) {
  return (
    <>
      <ForceColorScheme colorScheme={colorScheme} />
      <p className="center">
        Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
      </p>
    </>
  );
}
