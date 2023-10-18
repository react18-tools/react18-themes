import type { HTMLProps } from "react";
import { Logo } from "./common/logo";
import styles from "./root-layout.module.css";

export function Description({ children }: HTMLProps<HTMLElement>) {
	return (
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
			{children}
			<div>
				<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
					By Mayank
				</a>
			</div>
		</div>
	);
}
