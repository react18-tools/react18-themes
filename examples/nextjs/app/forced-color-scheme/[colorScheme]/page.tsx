import type { ColorSchemeType } from "react18-themes";
import { ForceColorScheme } from "react18-themes";

export default function PageWithForcedColorScheme({
	params: { colorScheme },
}: {
	params: { colorScheme: ColorSchemeType };
}) {
	return (
		<>
			<ForceColorScheme colorScheme={colorScheme} />
			<p>
				Color scheme is forced to {colorScheme}. Thus, default-{colorScheme}-theme is applied
			</p>
		</>
	);
}
