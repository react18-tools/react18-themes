"use client";
import type { ChangeEvent, HTMLProps } from "react";
import { useState } from "react";
import { darkThemes, lightThemes } from "../themes";
import { Select } from "../select";
import styles from "./cards.module.css";

const exampleTypes: string[] = ["Themed Page", "Forced Color Scheme"];

export interface PageNavigatorCardProps {
	LinkElement: (props: { to: string }) => JSX.Element;
}

export function PageNavigatorCard({ LinkElement }: PageNavigatorCardProps): JSX.Element {
	const [exampleType, setExampleType] = useState("Themed Page");
	const [example, setExample] = useState(darkThemes[0]);
	const [exampleOptions, setExampleOptions] = useState([...darkThemes, ...lightThemes]);
	const handleChangeExampleType: (e: ChangeEvent<HTMLSelectElement>) => void = e => {
		const expType = e.target.value;
		const expOptions = expType === "themed-page" ? [...darkThemes, ...lightThemes] : ["system", "dark", "light"];
		setExampleOptions(expOptions);
		setExample(expOptions[0]);
		setExampleType(expType);
	};

	const handleChangeExample: (e: ChangeEvent<HTMLSelectElement>) => void = e => setExample(e.target.value);

	return (
		<div className={styles.card}>
			<h2>
				Pages Navigator
				<LinkElement to={`/${exampleType.replace(/ +/g, "-").toLowerCase()}/${example}`} />
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
