import { defineConfig } from "tsup";
import reactUseClientPlugin from "esbuild-react18-useclient";
import ignoretestsPlugin from "esbuild-plugin-ignoretests";

// eslint-disable-next-line import/no-default-export -- export default is required for config files
export default defineConfig(options => ({
	format: ["cjs", "esm"],
	target: "es2019",
	sourcemap: false,
	clean: true,
	minify: !options.watch,
	esbuildPlugins: [reactUseClientPlugin, ignoretestsPlugin()],
	legacyOutput: true,
}));
