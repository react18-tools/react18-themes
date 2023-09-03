import { ForceTheme } from "react18-themes";

export default function PageWithForcedTheme({ params: { theme } }) {
	return (
		<>
			<ForceTheme theme={theme} />
			<p>Theme is forced to {theme}. | Try changing theme or colorScheme and verify!</p>
		</>
	);
}
