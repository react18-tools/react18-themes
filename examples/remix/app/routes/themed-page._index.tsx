import { ForceTheme } from "react18-themes";
import SubLayoutHeader from "~/components/sub-layout-header";

export default function PageWithForcedTheme(): JSX.Element {
	return (
		<div>
			<SubLayoutHeader scope="forcedTheme" />
			<ForceTheme theme="" />
			<p>Theme is forced to &quot;&quot;. | Try changing theme or colorScheme and verify!</p>
		</div>
	);
}
