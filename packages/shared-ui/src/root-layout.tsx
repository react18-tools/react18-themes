import "./globals.css";
import { ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server/index.js"; // import directory not supported in remix
import type { HTMLProps } from "react";
import { Footer } from "./footer";
import type { PageNavigatorCardProps } from "./cards/page-navigator-card";
import styles from "./root-layout.module.css";
import { ThemeController } from "./theme-controller/theme-controller";
import { Cards } from "./cards";
import { Hero } from "./hero";
import { Description } from "./description";

export type SharedRootLayoutProps = HTMLProps<HTMLElement> & PageNavigatorCardProps;

export function SharedRootLayout({ children, className = "", LinkElement, ...props }: SharedRootLayoutProps) {
	return (
		<>
			<ThemeSwitcher />
			<main className={`${styles.main} ${className}`} {...props}>
				<Description />
				<Hero />
				<ThemeController />
				<Cards LinkElement={LinkElement} />
			</main>
			<Footer />
			<ForkMe
				bgColor="var(--text-color)"
				gitHubUrl="https://github.com/mayank1513/react18-themes"
				textColor="var(--bg-color)"
			/>
		</>
	);
}
