import { ForceColorScheme } from "react18-themes";

export default function PageWithForcedColorScheme() {
	return (
		<>
			<ForceColorScheme colorScheme={""} />
			<p>Color scheme is forced to "" (Empty string)</p>
			<p>Thus, theme is applied irrespective of colorScheme</p>
		</>
	);
}
