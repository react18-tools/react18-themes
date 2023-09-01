"use strict";

const fs = require("node:fs");
const path = require("node:path");

const packageJson = require(path.resolve(process.cwd(), "package.json"));
if (process.env.TOKEN) {
	const { Octokit } = require("octokit");
	// Octokit.js
	// https://github.com/octokit/core.js#readme
	const octokit = new Octokit({
		auth: process.env.TOKEN,
	});

	const octoOptions = {
		owner: process.env.OWNER,
		repo: process.env.REPO,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	};
	octokit.request("GET /repos/{owner}/{repo}/topics", octoOptions).then(({ data }) => {
		octoOptions.names = [...new Set([...data.names, ...packageJson.keywords])];
		if (octoOptions.names.length !== data.names.length)
			octokit
				.request("PUT /repos/{owner}/{repo}/topics", octoOptions)
				.then(console.log)
				.catch(console.error);
	});
}
delete packageJson.devDependencies;
delete packageJson.scripts;

packageJson.main = "index.js";
packageJson.types = "index.d.ts";

fs.writeFileSync(
	path.resolve(process.cwd(), "dist", "package.json"),
	JSON.stringify(packageJson, null, 2),
);

fs.copyFileSync(
	path.resolve(process.cwd(), "..", "..", "README.md"),
	path.resolve(process.cwd(), "dist", "README.md"),
);
