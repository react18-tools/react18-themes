import { StarMe } from "@mayank1513/fork-me";
import styles from "./cards.module.css";

export function StarMeCard() {
	return (
		<StarMe className={styles.card} gitHubUrl="https://github.com/mayank1513/react18-themes">
			<h2>
				Star this repo <span>-&gt;</span>
			</h2>
			<p>Star this repo for your new library!</p>
		</StarMe>
	);
}
