import { ForkMe } from "@mayank1513/fork-me/server";
import "./globals.css";
import { ThemeSwitcher } from "react18-themes";
import type { ForcedPage } from "react18-themes/server";
import { ServerSideWrapper } from "react18-themes/server";
import { Inter } from "next/font/google";
import { StarMe } from "@mayank1513/fork-me";
import { ThemeController } from "shared-ui";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";
import PageNavigator from "./_components/page-navigator";

const inter = Inter({ subsets: ["latin"] });
const forcedPages: ForcedPage[] = [
	[/forced-color-scheme\/dark/, { colorScheme: "dark" }],
	[/forced-color-scheme\/light/, { colorScheme: "light" }],
	...[...darkThemes, ...lightThemes].map(th => [new RegExp(`themed-page/${th}`), { theme: "light" }] as ForcedPage),
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<ServerSideWrapper forcedPages={forcedPages} lang="en">
			<body>
				<ThemeSwitcher />
				<div className="container">
					<main className={`${styles.main} ${inter.className}`}>
						<div className={styles.description}>
							<a
								className={styles.logo}
								href="https://github.com/mayank1513/react18-themes"
								rel="noopener noreferrer"
								target="_blank">
								<p>
									<code className={styles.code}>react18-themes</code>
								</p>
							</a>
							{children}
							<div>
								<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
									By Mayank
								</a>
							</div>
						</div>

						<div className={styles.center}>
							<div>
								<h1>
									Build with <code>react18-themes</code>
								</h1>
								<p>Unleash the power of React Server Components!</p>
							</div>
						</div>
						<ThemeController />
						<div className={styles.cards}>
							<PageNavigator />
							<a
								className={styles.card}
								href="https://github.com/mayank1513/react18-themes"
								rel="noopener noreferrer"
								target="_blank">
								<h2>
									More Examples <span>-&gt;</span>
								</h2>
								<p>Explore more examples on official GitHub Repo.</p>
							</a>
							<StarMe className={styles.card} gitHubUrl="https://github.com/mayank1513/react18-themes">
								<h2>
									Star this repo <span>-&gt;</span>
								</h2>
								<p>Star this repo for your new library!</p>
							</StarMe>
						</div>
					</main>
				</div>
				<footer>
					with 💖 by{" "}
					<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
						Mayank Chaudhari
					</a>
				</footer>
				<ForkMe
					bgColor="var(--text-color)"
					gitHubUrl="https://github.com/mayank1513/react18-themes"
					textColor="var(--bg-color)"
				/>
			</body>
		</ServerSideWrapper>
	);
}
