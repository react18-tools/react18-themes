import fs from "node:fs";
import path from "node:path";
import type { PlopTypes } from "@turbo/gen";

// eslint-disable-next-line import/no-default-export -- export default is required for config files
export default function generator(plop: PlopTypes.NodePlopAPI): void {
	// A simple generator to add a new React component to the internal UI library
	plop.setGenerator("react-component", {
		description: "Adds a new react component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the component?",
			},
			{
				type: "confirm",
				name: "isClient",
				message: 'Is this a client component? (Should we add "use client" directive?)',
			},
			{
				type: "input",
				name: "description",
				message: "Describe your component. (This will be added as js-doc comment.)",
			},
		],
		actions: data => (data ? getActions(data as InquirerDataType) : []),
	});
}

interface InquirerDataType {
	isClient: boolean;
	name: string;
}

function getActions(data: InquirerDataType) {
	const { nestedRouteActions, root } = getNestedRouteActions(data);
	return nestedRouteActions.concat([
		{
			type: "add",
			path: `${root}{{kebabCase name}}/index.ts`,
			template: `${data.isClient ? '"use client";\n\n' : ""}export * from "./{{kebabCase name}}";\n`,
		},
		{
			type: "add",
			path: `${root}{{kebabCase name}}/{{kebabCase name}}.tsx`,
			templateFile: "templates/component.hbs",
		},
		{
			type: "add",
			path: `${root}{{kebabCase name}}/{{kebabCase name}}.test.tsx`,
			templateFile: "templates/component.test.hbs",
		},
		{
			type: "append",
			path: `${root}index.ts`,
			pattern: /(?<insertion> component exports)/g,
			template: 'export * from "./{{kebabCase name}}";',
		},
	]);
}

function getNestedRouteActions(data: InquirerDataType) {
	const { isClient, name } = data;
	const root = isClient ? "src/client/" : "src/server/";
	const nestedRouteActions: PlopTypes.ActionType[] = [];

	/** Return early if no nested routes */
	if (!name.includes("/")) return { nestedRouteActions, root };

	const lastSlashInd = name.lastIndexOf("/") || name.lastIndexOf("\\");
	/** following is required to make sure appropreate name is used while creating components */
	data.name = name.slice(lastSlashInd + 1);

	const dir = name.slice(0, lastSlashInd).split(/\/|\\/);
	const r1 = root.split(/\/|\\/);
	for (let i = 1; i <= dir.length; i++) {
		const p = path.resolve(process.cwd(), "..", "..", ...r1, ...dir.slice(0, i), "index.ts");
		if (!fs.existsSync(p)) {
			const content = `${isClient ? '"use client";\n' : ""}// ${dir.slice(0, i).join("/")} component exports\n`;
			nestedRouteActions.push({
				type: "add",
				path: `${root + dir.slice(0, i).join("/")}/index.ts`,
				template: content,
			});
			nestedRouteActions.push({
				type: "append",
				pattern: /(?<insertion> component exports)/g,
				path: `${root + (i === 1 ? "" : `${dir.slice(0, i - 1).join("/")}/`)}index.ts`,
				template: `export * from "./${dir[i - 1]}"`,
			});
		}
	}
	return { nestedRouteActions, root: `${root + dir.join("/")}/` };
}
