import { Link } from "@remix-run/react";

export default function SubLayoutHeader({ scope }: { scope: string }): JSX.Element {
	return (
		<h1>
			<Link to="/" style={{ display: "inline" }}>
				🔙🏡
			</Link>{" "}
			Example page showing <code>{scope}</code>
		</h1>
	);
}
