import { cssBundleHref } from "@remix-run/css-bundle";
// import { ForkMe } from "@mayank1513/fork-me/server";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { ThemeSwitcher } from "react18-themes";
import { Logo, ThemeController } from "shared-ui";
import styles from "./root.module.css";
// import { StarMe } from "@mayank1513/fork-me";
import "./globals.css";
import PageNavigator from "./page-navigator";

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeSwitcher />
				<div className="container">
					<main className={`${styles.main}`}>
						<div className={styles.description}>
							<a
								className={styles.logo}
								href="https://github.com/mayank1513/react18-themes"
								rel="noopener noreferrer"
								target="_blank">
								<p>
									<Logo className={styles.code} />
								</p>
							</a>
							<Outlet />
							<div>
								<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
									By Mayank
								</a>
							</div>
						</div>

						<div className={styles.center}>
							<div>
								<h1>
									Build with <Logo />
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
							{/* <StarMe className={styles.card} gitHubUrl="https://github.com/mayank1513/react18-themes">
								<h2>
									Star this repo <span>-&gt;</span>
								</h2>
								<p>Star this repo for your new library!</p>
							</StarMe> */}
						</div>
					</main>
				</div>
				<footer>
					with 💖 by{" "}
					<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
						Mayank Chaudhari
					</a>
				</footer>
				{/* <ForkMe
					bgColor="var(--text-color)"
					gitHubUrl="https://github.com/mayank1513/react18-themes"
					textColor="var(--bg-color)"
				/> */}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
