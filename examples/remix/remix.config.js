/** @type {import('@remix-run/dev').AppConfig} */
export default {
	ignoredRouteFiles: ["**/.*"],
	watchPaths: ["../../lib/react18-themes", "../../packages/shared-ui"],
	serverDependenciesToBundle: ["react18-themes", "shared-ui"],
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// publicPath: "/build/",
	// serverBuildPath: "build/index.js",
};
