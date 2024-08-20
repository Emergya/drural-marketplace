# MacawUI

Even it started as the official React UI components kit for dRural platform. It is only used in the dashboard. It has some important components as the `ThemeProvider`, the `Sidebar` and other navigational components. But apart from this is been deprecated, if you need to create components for dRural, the recomended way is to create them in the frontend application itlsef: storefront or dashboard.

## Installation

```sh
npm i @drural/macaw-ui
```

Note that this package depends on the following Material-UI **v4** packages: `@material-ui/core`, `@material-ui/icons` and `@material-ui/lab`. If your project doesn't have them installed and you're not using npm v7 with [automatically installed peer dependencies](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/) then you'll need to install them manually:

```sh
npm i @material-ui/core @material-ui/icons @material-ui/lab
```

## Working with Material-UI

MacawUI was created to integrate with [Material-UI](https://material-ui.com/) seamlessly. It exports a `ThemeProvider` that will override Material-UI component styles:

```jsx
import { ThemeProvider } from "@drural/macaw-ui";

<ThemeProvider>
  <App />
</ThemeProvider>;
```
