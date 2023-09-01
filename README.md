# Turborepo template [![test](https://github.com/mayank1513/react18-themes/actions/workflows/test.yml/badge.svg)](https://github.com/mayank1513/react18-themes/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/mayank1513/react18-themes/graph/badge.svg?token=8LX1NLNVRV)](https://codecov.io/gh/mayank1513/react18-themes) [![Version](https://img.shields.io/npm/v/react18-themes.svg?colorB=green)](https://www.npmjs.com/package/react18-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/react18-themes.svg)](https://www.npmjs.com/package/react18-themes) [![Unit Tests](https://github.com/mayank1513/react18-themes/actions/workflows/test.yml/badge.svg)](https://github.com/mayank1513/react18-themes/actions/workflows/test.yml) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react18-themes)

- ✅ Fully Treeshakable (`import from react18-themes/client/component`)
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
- ✅ Works with all build systems/tools/frameworks for React18

## Install

```bash
$ pnpm add @react18-themes
# or
$ npm install @react18-themes
# or
$ yarn add @react18-themes
```

> A quick tip: Delete all stale branches `git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d`



## What's different from scaffolding turbo-repo by `create-turbo`

The default scafold from `create-turbo` just gives some stubs for sharing packages across projects/apps within current monorepo.

This template is targeted for sharing packages across organizations/repos publically or privately.

Following features make it really cool and useful

- Unit tests with `vitest`
- Build setup with `tsup` and `esbuild-react18-useclient` Supports React Server components out of the box
- **Automatic file generation**
  - just run `yarn turbo gen` and follow the propts to auto generate your new component with test file and dependency linking
  - follow best practices automatically
- As a small extra gift Fork Me component is already added in UI
- github actions/workflows to auto publish your package when version changes

## Checklist

- [ ] Set up `CodeCov`
  - [ ] Update codecov badge in README
- [ ] Update description in `packages/react18-themes/package.json`
- [ ] Create your library and update examples
- [ ] Update README
- [ ] Push your changes/Create PR and see your library being automatically tested and published
- [ ] Optionally deploy your example(s) to Vercel.
- [ ] You are most welcome to star this template, contribute, and/or sponsor the terbo-repo-template project / me

## What's inside?

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Apps and Packages

This Turborepo includes the following packages/apps:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `docs`: another [Next.js](https://nextjs.org/) app
- `ui`: a React component library shared by both `nextjs` and `docs` examples
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

### 🤩 Don't forger to start this repo!

Want handson course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2)

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
