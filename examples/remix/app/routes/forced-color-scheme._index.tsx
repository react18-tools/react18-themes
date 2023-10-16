import { ForceColorScheme } from "react18-themes";
import SubLayoutHeader from "~/components/sub-layout-header";

export default function PageWithForcedColorScheme(): JSX.Element {
	return (
		<div>
			<SubLayoutHeader scope="forcedColorScheme" />
			<ForceColorScheme colorScheme="" />
			<p>
				Color scheme is forced to &quot;&quot; (Empty string)
				<br />
				Thus, theme is applied irrespective of colorScheme
			</p>
		</div>
	);
}
