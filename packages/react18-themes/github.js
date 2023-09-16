"use strict";

const fs = require("node:fs");
const path = require("node:path");

const wd = path.resolve(process.cwd(), "dist");
const packageJson = require(path.resolve(wd, "package.json"));
packageJson.publishConfig = {
	registry: "https://npm.pkg.github.com",
};
fs.writeFileSync(path.resolve(wd, "package.json"), JSON.stringify(packageJson, null, 2));
