# Migration Guide

## Migrating to v3.2

- Server-side targets and wrappers are deprecated.
- Sibling selectors are no longer needed.
- Support for scoped styles is now available.

## Migrating from v1 to v2

### Major Changes

- 6f17cce: Additional CSS Combinations + Seamless Support for Tailwind

  - No changes are required for client-side code as `[data-theme=]` selectors continue to function as before.
  - If you are using `ServerSideWrapper`, `NextJsServerTarget`, or `NextJsSSGThemeSwitcher`, you need to convert `forcedPages` elements to objects in the shape of `{ pathMatcher: RegExp | string; props: ThemeSwitcherProps }`.
  - Use `resolvedColorScheme` for more robust dark/light/system modes.
  - Utilize combinations of `[data-th=""]` and `[data-color-scheme=""]` for dark/light theme variants.
  - Use `[data-csp=""]` to style based on colorSchemePreference.

### Minor Changes

- Support Custom Theme Transitions

  - Provide the `themeTransition` prop to the `ThemeSwitcher` component for smooth theme transitions.
  - Use `setThemeSet` to simultaneously set `lightTheme` and `darkTheme`.

#### Motivation:

To achieve server-side syncing, cookies and headers are necessary. This means that this component and its children cannot be static and will be rendered server-side for each request. By avoiding the wrapper, only the `NextJsSSGThemeSwitcher` will be rendered server-side for each request, while the rest of your app can be statically generated.

Take note of the following when migrating to `v2`:

- No changes are required for projects not using the `Next.js` app router or server components, except for updating the cookies policy if needed.
- Persistent storage is now implemented using `cookies` instead of `localStorage`. You may need to update your cookies policy accordingly.
- The `NextJsSSGThemeSwitcher` is provided as an alternative to `ServerSideWrapper` for `Next.js`. The wrapper component, which disrupted static generation and enforced SSR, is no longer needed.
- Visit [With Next.js `app` router (Server Components)](#with-nextjs-app-router-server-components) for more information.

## Migrating from v0 to v1

- `defaultDarkTheme` has been renamed to `darkTheme`.
- `setDefaultDarkTheme` has been renamed to `setDarkTheme`.
- `defaultLightTheme` has been renamed to `lightTheme`.
- `setDefaultLightTheme` has been renamed to `setLightTheme`.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
