import { Link } from "@remix-run/react";
import { ForceTheme } from "react18-themes";
import { ForcedPageLayout } from "shared-ui";

export default function PageWithForcedTheme(): JSX.Element {
	return (
		<ForcedPageLayout LinkElement={Link} scope="forcedTheme">
			<ForceTheme theme="" />
			<p>Theme is forced to &quot;&quot;. | Try changing theme or colorScheme and verify!</p>
		</ForcedPageLayout>
	);
}
