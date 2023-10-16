import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ForceColorScheme } from "react18-themes";
import SubLayoutHeader from "~/components/sub-layout-header";

export async function loader({ params }: LoaderFunctionArgs) {
	return params.colorScheme;
}

export default function PageWithForcedColorScheme(): JSX.Element {
	const colorScheme = useLoaderData();
	return (
		<div>
			<SubLayoutHeader scope="forcedColorScheme" />
			<ForceColorScheme colorScheme={colorScheme} />
			<p>
				Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
			</p>
		</div>
	);
}
