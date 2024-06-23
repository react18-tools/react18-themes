/** It is assumed that this is called only from the default branch. */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Apply changesets if any -- e.g., coming from pre-release branches
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}
try {
  execSync("pnpm changeset version");
  execSync(
    `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${process.env.BRANCH}`,
  );
} catch {
  // no changesets to be applied
}

const pkg = require("../lib/package.json");
const { version: VERSION, name } = pkg;
let LATEST_VERSION = "0.0.-1";

try {
  LATEST_VERSION = execSync(`npm view ${name} version`).toString() ?? "0.0.-1";
} catch {
  // empty
}

console.log({ VERSION, LATEST_VERSION });

const [newMajor, newMinor] = VERSION.split(".");
const [oldMajor, oldMinor] = LATEST_VERSION.split(".");

const isPatch = newMajor === oldMajor && newMinor === oldMinor;

if (!isPatch) {
  require("./update-security-md")(`${newMajor}.${newMinor}`, `${oldMajor}.${oldMinor}`);
  /** Create new release branch for every Major or Minor release */
  const releaseBranch = `release-${newMajor}.${newMinor}`;
  execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
}

/** Create release */
execSync("cd lib && pnpm build");

delete pkg.files;

fs.writeFileSync(
  path.join(__dirname, "../lib/dist/package.json"),
  JSON.stringify(pkg, null, 2).replace(/dist\//g, ""),
);

fs.copyFileSync(
  path.join(__dirname, "../README.md"),
  path.join(__dirname, "../lib/dist/README.md"),
);

execSync("cd lib/dist && npm publish --provenance --access public");

/** Create GitHub release */
execSync(
  `gh release create ${VERSION} --generate-notes --latest -n "$(sed '1,/^## /d;/^## /,$d' CHANGELOG.md)" --title "Release v${VERSION}"`,
);

execSync("node ./scripts/lite.js");
execSync(
  "cd lib && pnpm build && cp package.json dist/package.json && cp README.md dist/README.md && cd dist && npm publish --provenance --access public",
);
