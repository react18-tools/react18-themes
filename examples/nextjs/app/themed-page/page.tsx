import { ForceTheme } from "react18-themes";

export default function PageWithForcedTheme(): JSX.Element {
  return (
    <>
      <ForceTheme theme="" />
      <p>Theme is forced to &quot;&quot;</p>
    </>
  );
}
