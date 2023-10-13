import Link from "next/link";

export default function ForcedSchemeLayout({ children }): JSX.Element {
	return (
		<div>
			<h1>
				<Link href="/" style={{ display: "inline" }}>
					🔙🏡
				</Link>{" "}
				Example page showing <code>forcedColorScheme</code>
			</h1>
			{children}
		</div>
	);
}
