# React 18 Themes <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/react18-themes/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-themes/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/55a85ada9dd24603340f/maintainability)](https://codeclimate.com/github/react18-tools/react18-themes/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react18-themes/branch/main/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-themes) [![Version](https://img.shields.io/npm/v/react18-themes.svg?colorB=green)](https://www.npmjs.com/package/react18-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/react18-themes.svg)](https://www.npmjs.com/package/react18-themes) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react18-themes) [![Contact me on Codementor](https://www.codementor.io/m-badges/mayank1513/get-help.svg)](https://www.codementor.io/@mayank1513?refer=badge)

<details>
<summary>Version 3 Short Notes:</summary>
Version 3.0 brings minor API changes along with major performance improvements and fixes. We have minimized changes to existing APIs.

Note: [react18-themes](https://github.com/react18-tools/react18-themes/) will now be maintained as `react18-themes`, as server-specific APIs are no longer needed.

</details>

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

- ✅ Perfect dark mode in 2 lines of code
- ✅ Fully Treeshakable (`import from react18-themes/client/component`)
- ✅ Full TypeScript Support
- ✅ Secure by design - we support nonce for scripts and styles
- ✅ Unleash the full power of React 18 Server components

> Exampand following to see more features.

<details>
<summary><h2 style="display:inline">Motivation and Key Features:</h2></summary>

This project was inspired by next-themes. Unlike next-themes, `react18-themes` doesn't require wrapping everything in a provider, allowing you to take full advantage of React 18 Server Components. Additionally, it offers more features and control over your app's theming.

- ✅ Perfect dark mode in 2 lines of code
- ✅ Fully Treeshakable (`import from react18-themes/client/component`)
- ✅ Designed for excellence
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React 18 Server components
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 & Next.js 14 `appDir`
- ✅ No flash on load (for all - SSG, SSR, ISG, Server Components)
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class and data attribute selector
- ✅ Manipulate theme via `useTheme` hook
- ✅ Documented with [Typedoc](https://react18-tools.github.io/react18-themes) ([Docs](https://react18-tools.github.io/react18-themes))
- ✅ Use combinations of [data-th=""] and [data-color-scheme=""] for dark/light variants of themes
- ✅ Use [data-csp=""] to style based on colorSchemePreference.
</details>

> Check out the [live example](https://react18-themes.vercel.app/).

<details>
<summary><h2 style="display:inline">Installation</h2></summary>

```bash
$ pnpm add react18-themes
```

**_or_**

```bash
$ npm install react18-themes
```

**_or_**

```bash
$ yarn add react18-themes
```

</details>

<details>
<summary><h2 style="display:inline">Want Lite Version?</h2>

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react18-themes-lite)](https://www.npmjs.com/package/react18-themes-lite) [![Version](https://img.shields.io/npm/v/react18-themes-lite.svg?colorB=green)](https://www.npmjs.com/package/react18-themes-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/react18-themes-lite.svg)](https://www.npmjs.com/package/react18-themes-lite)

</summary>

```bash
$ pnpm add react18-themes-lite
```

**or**

```bash
$ npm install react18-themes-lite
```

**or**

```bash
$ yarn add react18-themes-lite
```

> Note: `r18gs` is a peer dependency

</details>

## Usage

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

To add dark mode support, modify `_app.js` as follows:

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

⚡🎉Boom! Dark mode is ready in just a couple of lines!

### With Next.js `app` router (Server Components)

Update `app/layout.jsx` to add `ThemeSwitcher` from `react18-themes`:

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "react18-themes";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
```

Woohoo! Multiple theme modes with Server Components support!

### HTML & CSS

Next.js app supports dark mode, including System preference with `prefers-color-scheme`. The theme is synced between tabs, modifying the `data-theme` attribute on the `html` element:

```css
:root {
  --background: white;
  --foreground: black;
}

[data-theme="dark"] {
  --background: black;
  --foreground: white;
}
```

## Images

Show different images based on the current theme:

```ts
import Image from "next/image";
import { useTheme } from "react18-themes";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "light" ? "/light.png" : "/dark.png";
  return <Image src={src} width={400} height={400} />;
}

export default ThemedImage;
```

### useTheme

The `useTheme` hook provides theme information and allows changing the theme:

```js
import { useTheme } from "react18-themes";

const ThemeChanger = () => {
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

The `useTheme` hook returns the following object:

```tsx
interface UseThemeYield {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  systemColorScheme: ResolvedColorSchemeType;
  resolvedColorScheme: ResolvedColorSchemeType;
  resolvedTheme: string;
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  toggleColorScheme: (skipSystem?: boolean) => void;
  setForcedTheme: (forcedTheme: string) => void;
  setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => void;
}
```

<details>
<summary><h2 style="display:inline">Force per page theme and color-scheme</h2></summary>

### Next.js App Router

```tsx
import { ForceTheme } from "react18-themes/force-theme";

function MyPage() {
  return (
    <>
      <ForceTheme theme="my-theme" />
      ...
    </>
  );
}

export default MyPage;
```

### Next.js Pages Router

For the pages router, you have two options. The first option is the same as the app router, and the second option, which is compatible with `next-themes`, involves adding the `theme` property to your page component like this:

```javascript
function MyPage() {
  return <>...</>;
}

MyPage.theme = "my-theme";

export default MyPage;
```

Similarly, you can force a color scheme. This will apply your `defaultDark` or `defaultLight` theme, which can be configured via hooks.

</details>

### With Styled Components and any CSS-in-JS

Next Themes works with any library. For Styled Components, `createGlobalStyle` in your custom App:

```js
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { ThemeSwitcher } from "react18-themes";

const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeSwitcher forcedTheme={Component.theme} />
      <Component {...pageProps} />
    </>
  );
}
```

### With Tailwind

In `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

⚡🎉Ready to use dark mode in Tailwind!

> Caution: Your class must be `"dark"`, which is the default value used in this library. Tailwind requires the class name `"dark"` for dark-theme.

Use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

## Migration

> Refer to the [migration guide](./guides/migration.md).

## Docs

[Typedoc](https://react18-tools.github.io/react18-themes)

### 🤩 Don't forget to star this repo!

Want a hands-on course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2)

## FAQ

**Do I need to use CSS variables with this library?**

No. You can hard code values for every class:

```css
.my-class {
  color: #555;
}

[data-theme="dark"] .my-class {
  color: white;
}
```

**Why is `resolvedTheme` and `resolvedColorScheme` necessary?**

To reflect the System theme preference and forced theme/colorScheme pages in your UI. For instance, buttons or dropdowns indicating the current colorScheme should say "system" when the System colorScheme preference is active.

`resolvedTheme` is useful for modifying behavior or styles at runtime:

```js
const { resolvedTheme, resolvedColorScheme } = useTheme();
const background = getBackground(resolvedTheme);

<div style={{ color: resolvedColorScheme === 'dark' ? white : black, background }}>
```

Without `resolvedTheme`, you would only know the theme is "system", not what it resolved to.

![Repo stats](https://repobeats.axiom.co/api/embed/3cc219825aee3c38bad8829fb9da0dd6301a1867.svg "Repobeats analytics image")

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
