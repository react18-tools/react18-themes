# React 18 Themes

[![test](https://github.com/react18-tools/react18-themes/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-themes/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/55a85ada9dd24603340f/maintainability)](https://codeclimate.com/github/react18-tools/react18-themes/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react18-themes/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-themes) [![Version](https://img.shields.io/npm/v/react18-themes.svg?colorB=green)](https://www.npmjs.com/package/react18-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/react18-themes.svg)](https://www.npmjs.com/package/react18-themes) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react18-themes) [![Get help](codementor.svg)](https://www.codementor.io/@mayank1513?refer=badge) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

This project is inspired by `next-themes`. `next-themes` is an awesome package, however, it requires wrapping everything in a client side provider. And thus, it takes away all the benefits of Server Components.

`react18-themes` removes this limitation and enables you to unleash the full power of React 18 Server Components. In addition, more features are coming up soon... Stay tuned!

- ✅ Fully Treeshakable (`import from react18-themes/client/component`)
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
- ✅ Works with all build systems/tools/frameworks for React18
- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 & Next.js 14 `appDir`
- ✅ Sync theme across tabs and windows
- ✅ Theme in sync with server component
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ Manipulate theme via `useTheme` hook
- ✅ Doccumented with [Typedoc](https://react18-tools.github.io/react18-themes) ([Docs](https://react18-tools.github.io/react18-themes))
- ✅ Use combinations of [data-th=""] and [data-color-scheme=""] for dark/light varients of themes
- ✅ Use [data-csp=""] to style based on colorSchemePreference.

Check out the [live example](https://react18-themes.vercel.app/).

## Install

```bash
$ pnpm add react18-themes
# or
$ npm install react18-themes
# or
$ yarn add react18-themes
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/react18-themes-lite)](https://www.npmjs.com/package/react18-themes-lite) [![Version](https://img.shields.io/npm/v/react18-themes-lite.svg?colorB=green)](https://www.npmjs.com/package/react18-themes-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/react18-themes-lite.svg)](https://www.npmjs.com/package/react18-themes-lite)

```bash
$ pnpm add react18-themes-lite
# or
$ npm install react18-themes-lite
# or
$ yarn add react18-themes-lite
```

> You need Zustand as a peer-dependency

## Usage

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

The best way is to add a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use by modifying `_app` as follows:

Adding dark mode support takes 2 lines of code:

```js
import { ThemeSwitcher } from "react18-themes";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeSwitcher forcedTheme={Component.theme} />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
```

⚡🎉Boom! Just a couple of lines and your dark mode is ready!

Check out examples for advanced usage.

### With Next.js `app` router (Server Components)

#### Prefer static generation over SSR - No wrapper component

> If your app is mostly serving static content, you do not want the overhead of SSR. Use `NextJsSSGThemeSwitcher` in this case.
> When using this approach, you need to use CSS general sibling Combinator (~) to make sure your themed CSS is properly applied. See (HTML & CSS)[#html--css].

Update your `app/layout.jsx` to add `ThemeSwitcher` from `react18-themes`, and `NextJsSSGThemeSwitcher` from `react18-themes/server`. `NextJsSSGThemeSwitcher` is required to avoid flash of un-themed content on reload.

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "react18-themes";
import { NextJsSSGThemeSwitcher } from "react18-themes/server/nextjs";

export default function Layout({ children }) {
	return (
		<html lang="en">
			<head />
			<body>
				/** use NextJsSSGThemeSwitcher as first element inside body */
				<NextJsSSGThemeSwitcher />
				<ThemeSwitcher />
				{children}
			</body>
		</html>
	);
}
```

Woohoo! You just added multiple theme modes and you can also use Server Component! Isn't that awesome!

#### Prefer SSR over SSG - Use wrapper component

> If your app is serving dynamic content and you want to utilize SSR, continue using `ServerSideWrapper` component to replace `html` tag in `layout.tsx` file.

Update your `app/layout.jsx` to add `ThemeSwitcher` and `ServerSideWrapper` from `react18-themes`. `ServerSideWrapper` is required to avoid flash of un-themed content on reload.

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "react18-themes";
import { ServerSideWrapper } from "react18-themes/server/nextjs";

export default function Layout({ children }) {
	return (
		<ServerSideWrapper tag="html" lang="en">
			<head />
			<body>
				<ThemeSwitcher />
				{children}
			</body>
		</ServerSideWrapper>
	);
}
```

Woohoo! You just added dark mode and you can also use Server Component! Isn't that awesome!

### HTML & CSS

That's it, your Next.js app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, react18-themes modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

```css
:root {
	/* Your default theme */
	--background: white;
	--foreground: black;
}

[data-theme="dark"] {
	--background: black;
	--foreground: white;
}

// v2 onwards when using NextJsSSGThemeSwitcher, we need to use CSS Combinators
[data-theme="dark"] ~ * {
	--background: black;
	--foreground: white;
}
```

### useTheme

In case your components need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```js
import { useTheme } from "react18-themes";

const ThemeChanger = () => {
	/* you can also improve performance by using selectors
	 * const [theme, setTheme] = useTheme(state => [state.theme, state.setTheme]);
	 */
	const { theme, setTheme } = useTheme();

	return (
		<div>
			The current theme is: {theme}
			<button onClick={() => setTheme("light")}>Light Mode</button>
			<button onClick={() => setTheme("dark")}>Dark Mode</button>
		</div>
	);
};
```

## Force per page theme and color-scheme

### Next.js app router

```javascript
import { ForceTheme } from "react18-themes";

function MyPage() {
	return (
		<>
			<ForceTheme theme={"my-theme"} />
			...
		</>
	);
}

export default MyPage;
```

### Next.js pages router

For pages router, you have 2 options. One is the same as the app router and the other option which is compatible with `next-themes` is to add `theme` to your page component as follows.

```javascript
function MyPage() {
	return <>...</>;
}

MyPage.theme = "my-theme";

export default MyPage;
```

In a similar way, you can also force color scheme.

Forcing color scheme will apply your defaultDark or defaultLight theme, configurable via hooks.

## Migrating from v1 to v2

#### Motivation:

For server side syncing, we need to use cookies and headers. This means that this component and its children can not be static. They will be rendered server side for each request. Thus, we are avoiding the wrapper. Now, only the `NextJsSSGThemeSwitcher` will be rendered server side for each request and rest of your app can be server statically.

Take care of the following while migrating to `v2`.

- No changes required for projects not using `Next.js` app router or server components other than updating cookies policy if needed.
- The persistent storage is realized with `cookies` in place of `localStorage`. (You might want to update cookies policy accordingly.)
- We have provided `NextJsSSGThemeSwitcher` in addition to `ServerSideWrapper` for `Next.js`. You no longer need to use a wrapper component which broke static generation and forced SSR.
- Visit [With Next.js `app` router (Server Components)](#with-nextjs-app-router-server-components)

## Migrating from v0 to v1

- `defaultDarkTheme` is renamed to `darkTheme`
- `setDefaultDarkTheme` is renamed to `setDarkTheme`
- `defaultLightTheme` is renamed to `lightTheme`
- `setDefaultLightTheme` is renamed to `setLightTheme`

## Docs

[Typedoc](https://react18-tools.github.io/react18-themes)

### 🤩 Don't forger to start this repo!

Want handson course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2)

![Alt](https://repobeats.axiom.co/api/embed/846d01d5bb0cc683bffe0a25e289334b49acebd1.svg "Repobeats analytics image")

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
