import { Link } from "@remix-run/react";
import { ForceColorScheme } from "react18-themes";
import { ForcedPageLayout } from "shared-ui";

export default function PageWithForcedColorScheme(): JSX.Element {
	return (
		<ForcedPageLayout LinkElement={Link} scope="forcedColorScheme">
			<ForceColorScheme colorScheme="" />
			<p>
				Color scheme is forced to &quot;&quot; (Empty string)
				<br />
				Thus, theme is applied irrespective of colorScheme
			</p>
		</ForcedPageLayout>
	);
}
