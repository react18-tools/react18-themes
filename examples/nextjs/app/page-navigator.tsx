"use client";
import { useState } from "react";
import Link from "next/link";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";

export default function PageNavigator(): JSX.Element {
	const [exampleType, setExampleType] = useState("themed-page");
	const [exampleOption, setExampleOption] = useState(darkThemes[0]);
	const [exampleOptions, setExampleOptions] = useState([...darkThemes, ...lightThemes]);
	const handleChangeExampleType: (exampleType: string) => void = exampleType => {
		const exampleOptions =
			exampleType === "themed-page" ? [...darkThemes, ...lightThemes] : ["system", "dark", "light"];
		setExampleOptions(exampleOptions);
		setExampleOption(exampleOptions[0]);
		setExampleType(exampleType);
	};
	return (
		<div className={styles.card}>
			<h2>
				Pages Navigator
				<Link href={`/${exampleType}/${exampleOption}`}>
					{" "}
					<span>-&gt;</span>
				</Link>
			</h2>
			<p>
				Pages with forced <code>theme</code>/<code>colorScheme</code>
			</p>
			<br />
			<nav>
				<select onChange={e => handleChangeExampleType(e.target.value)} value={exampleType}>
					<option value="themed-page">Themed Page</option>
					<option value="forced-color-scheme">Forced ColorScheme</option>
				</select>{" "}
				<select onChange={e => setExampleOption(e.target.value)} value={exampleOption}>
					{exampleOptions.map(o => (
						<option key={o} value={o}>
							{o}
						</option>
					))}
				</select>
			</nav>
		</div>
	);
}
