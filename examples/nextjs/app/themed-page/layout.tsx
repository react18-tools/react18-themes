import Link from "next/link";

export default function ForcedSchemeLayout({ children }) {
	return (
		<div>
			<h1>
				<Link href="/" style={{ display: "inline" }}>
					🔙🏡
				</Link>{" "}
				Example page showing <code>forcedTheme</code>
			</h1>
			{children}
		</div>
	);
}
