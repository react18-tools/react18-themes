import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { StarMe } from "@mayank1513/fork-me";
import ColorSchemePreference from "./color-scheme-preference";
import ThemeSelector from "./theme-selector";
import DarkThemeSelector from "./dark-theme-selector";
import LightThemeSelector from "./light-theme-selector";
import PageNavigator from "./page-navigator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={`${styles.main} ${inter.className}`}>
			<div className={styles.description}>
				<a
					href="https://github.com/mayank1513/react18-themes"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.logo}>
					<p>
						<code className={styles.code}>react18-themes</code>
					</p>
				</a>
				<div>
					<a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
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
			<div className={[styles.center, styles.prefs].join(" ")}>
				<div>
					<ColorSchemePreference />
					<ThemeSelector />
				</div>
				<div>
					<DarkThemeSelector />
					<LightThemeSelector />
				</div>
			</div>
			<div className={styles.cards}>
				<PageNavigator />
				<a
					href="https://github.com/mayank1513/react18-themes"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer">
					<h2>
						More Examples <span>-&gt;</span>
					</h2>
					<p>Explore more examples on official GitHub Repo.</p>
				</a>
				<StarMe gitHubUrl="https://github.com/mayank1513/react18-themes" className={styles.card}>
					<h2>
						Star this repo <span>-&gt;</span>
					</h2>
					<p>Star this repo for your new library!</p>
				</StarMe>
			</div>
		</main>
	);
}
