import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix Example" },
		{ name: "description", content: "Welcome to React18 Themes with Remix!" },
	];
};

export default function Home() {
	return <div>Remix Example</div>;
}
