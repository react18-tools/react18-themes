# react18-themes

## 2.0.1

### Patch Changes

- 6b46438: export ServerSideWrapper for backward compatibility and also for avoiding CSS Combinators when SSR is desired over static.

## 2.0.0

### Major Changes

- f3704f9: When headers or cookies used in server component, it is no longer static. It will be generated on server side for every request. Thus, wrapping antire layout in `<ServerSideWrapper>` had disadvantage of always causing re-renders on the server.

  In this version, we have rebranded `ServerSideWrapper` as `NextJsSSRThemeSwitcher`. `NextJsSSRThemeSwitcher` need not wrap any components. Rather we use CSS Combinators to apply appropreate themes.

  More in the docs...

## 1.1.3

### Patch Changes

- Upgrade deps

## 1.1.2

### Patch Changes

- Fix Readme and docs

## 1.1.1

### Patch Changes

- Upgrade Next.js peer dependency

## 1.1.0

### Minor Changes

- cdf0613: Added ColorSwitch component

## 1.0.10

### Patch Changes

- 9db6365: Add data-color-scheme-pref on server side as well

## 1.0.9

### Patch Changes

- Add `data-color-scheme` attribute -> we will be simplifying the library use in near future

## 1.0.7

### Patch Changes

- 3bc14c9: Fix: publish to github

## 1.0.6

### Patch Changes

- 37c9223: Setup Changeset
- 8ee8462: Upgrate dependencies
