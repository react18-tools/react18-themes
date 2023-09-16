"use strict";

const fs = require("node:fs");
const path = require("node:path");

const packageJson = require(path.resolve(process.cwd(), "package.json"));

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
