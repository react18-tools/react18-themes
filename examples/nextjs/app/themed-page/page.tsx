import { ForceTheme } from "react18-themes";

export default function PageWithForcedTheme() {
	return (
		<>
			<ForceTheme theme={""} />
			<p>Theme is forced to ""</p>
		</>
	);
}
