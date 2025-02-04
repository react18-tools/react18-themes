import { ForceTheme } from "react18-themes";

interface PageProps {
  params: { theme: string };
}

export default function PageWithForcedTheme({ params: { theme } }: PageProps) {
  return (
    <>
      <ForceTheme theme={theme} />
      <p className="center">
        Theme is forced to {theme}. Try changing theme or colorScheme and verify!
      </p>
    </>
  );
}
