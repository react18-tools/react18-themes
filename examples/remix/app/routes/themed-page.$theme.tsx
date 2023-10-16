import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ForceTheme } from "react18-themes";
import SubLayoutHeader from "~/components/sub-layout-header";

export async function loader({ params }: LoaderFunctionArgs) {
	return params.theme;
}

export default function PageWithForcedTheme(): JSX.Element {
	const theme = useLoaderData();
	return (
		<div>
			<SubLayoutHeader scope="forcedTheme" />
			<ForceTheme theme={theme} />
			<p>Theme is forced to {theme}. | Try changing theme or colorScheme and verify!</p>
		</div>
	);
}
