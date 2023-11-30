import type { ForcedPage } from "react18-themes/server";
import { NextJsSSGThemeSwitcher } from "react18-themes/server";
import { Inter } from "next/font/google";
import { SharedRootLayout, darkThemes, lightThemes } from "shared-ui";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const forcedPages: ForcedPage[] = [
	[/forced-color-scheme\/dark/, { colorScheme: "dark" }],
	[/forced-color-scheme\/light/, { colorScheme: "light" }],
	...[...darkThemes, ...lightThemes].map(th => [new RegExp(`themed-page/${th}`), { theme: "light" }] as ForcedPage),
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body>
				<NextJsSSGThemeSwitcher forcedPages={forcedPages} />
				<SharedRootLayout LinkElement={Link} className={inter.className}>
					{children}
				</SharedRootLayout>
			</body>
		</html>
	);
}
