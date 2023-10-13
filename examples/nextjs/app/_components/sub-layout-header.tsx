import Link from "next/link";

export default function SubLayoutHeader({ scope }: { scope: string }): JSX.Element {
	return (
		<h1>
			<Link href="/" style={{ display: "inline" }}>
				🔙🏡
			</Link>{" "}
			Example page showing <code>{scope}</code>
		</h1>
	);
}
