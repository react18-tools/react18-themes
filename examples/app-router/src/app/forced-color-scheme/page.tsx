import { ForceColorScheme } from "react18-themes";

export default function PageWithForcedColorScheme() {
  return (
    <>
      <ForceColorScheme colorScheme="" />
      <p className="center">
        Color scheme is forced to &quot;&quot; (Empty string)
        <br />
        Thus, theme is applied irrespective of colorScheme
      </p>
    </>
  );
}
