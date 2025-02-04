import { ForceTheme } from "react18-themes";

export default function PageWithForcedTheme() {
  return (
    <>
      <ForceTheme theme="" />
      <p className="center">Theme is forced to &quot;&quot;</p>
    </>
  );
}
