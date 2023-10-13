import { ForceTheme } from "react18-themes";

interface PageProps {
	params: { theme: string };
}

export default function PageWithForcedTheme({ params: { theme } }: PageProps): JSX.Element {
	return (
		<>
			<ForceTheme theme={theme} />
			<p>Theme is forced to {theme}. | Try changing theme or colorScheme and verify!</p>
		</>
	);
}
