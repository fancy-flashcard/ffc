# FFC - Fancy FlashCard <!-- omit in toc -->

![Build and Deploy](https://github.com/dhbw-ffc/ffc/workflows/Build%20and%20Deploy/badge.svg)

- [Documentation](#documentation)
- [Vue](#vue)
  - [Why Vue?](#why-vue)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
- [Deployment](#deployment)

## Documentation

See [Documentation](docs/README.md).

## Vue

### Why Vue?

- easier to learn/use (compared to e.g. React and Angular)
- community backed
- lightweight
- easy to expand

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment

The app is build and deployed to https://fancy-flashcard.github.io/ffc on every push to master branch (via GitHub Actions and GitHub Pages).
