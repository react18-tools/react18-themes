import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ForceColorScheme } from "react18-themes";
import { ForcedPageLayout } from "shared-ui";

export async function loader({ params }: LoaderFunctionArgs) {
	return params.colorScheme;
}

export default function PageWithForcedColorScheme(): JSX.Element {
	const colorScheme = useLoaderData();
	return (
		<ForcedPageLayout LinkElement={Link} scope="forcedColorScheme">
			<ForceColorScheme colorScheme={colorScheme} />
			<p>
				Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
			</p>
		</ForcedPageLayout>
	);
}
