"use client";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { darkThemes, lightThemes, Select } from "shared-ui";
import styles from "../root.module.css";
import { Link } from "@remix-run/react";

const exampleTypes: string[] = ["Themed Page", "Forced Color Scheme"];

export default function PageNavigator(): JSX.Element {
	const [exampleType, setExampleType] = useState("Themed Page");
	const [example, setExample] = useState(darkThemes[0]);
	const [exampleOptions, setExampleOptions] = useState([...darkThemes, ...lightThemes]);
	const handleChangeExampleType: (e: ChangeEvent<HTMLSelectElement>) => void = e => {
		const exampleType = e.target.value;
		const exampleOptions =
			exampleType === "themed-page" ? [...darkThemes, ...lightThemes] : ["system", "dark", "light"];
		setExampleOptions(exampleOptions);
		setExample(exampleOptions[0]);
		setExampleType(exampleType);
	};

	const handleChangeExample: (e: ChangeEvent<HTMLSelectElement>) => void = e => setExample(e.target.value);

	return (
		<div className={styles.card}>
			<h2>
				Pages Navigator
				<Link to={`/${exampleType.replace(/ +/g, "-").toLowerCase()}/${example}`}>
					&nbsp;<span>-&gt;</span>
				</Link>
			</h2>
			<p>
				Pages with forced <code>theme</code>/<code>colorScheme</code>
			</p>
			<br />
			<nav>
				<Select onChange={handleChangeExampleType} options={exampleTypes} value={exampleType} />
				<Select onChange={handleChangeExample} options={exampleOptions} value={example} />
			</nav>
		</div>
	);
}
