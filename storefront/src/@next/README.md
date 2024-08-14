## @next

This directory contains components with logic that aligns with new project structure.

## Project structure

### Components

We use [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) to organise components into groups. The general rule of thumb is following:

- Use `atoms` for smallest building blocks (think button or input)
- Use `molecules` for things that consist of atoms (think input with labels and error/helper text)
- Use `organisms` for things that consist of molecules and/or atoms that together create a standalone UI block (think login form)
- Use `templates` for things that consist of organisms, molecules and/or atoms that together create a whole UI for a page (think login template for page)

### Pages

Pages use templates to create the whole view of the page. They are responsible for fetching data (from the SDK or custom queries) and passing it to the templates. Usually, they are structured in a view and page file. The view file is responsible for fetching data and passing it to the page file. The page file is responsible for rendering the template with the data.

### Hooks

These are general purpose react hooks used by components.

### Utils

These are general purpose utils functions used anywhere.

### Types

Shared types by different components.

### globalStyles

Global theme, style, functions or constants applied to style of components.

## Creating new component

Run

```
npm run generate
```

and follow the instructions on screen

<b>Use Storybook to create and test your components</b>

In your component directory edit the `stories.tsx` and try to showcase component in different scenarios

To see it in action, run

```
npm run @storybook
```
