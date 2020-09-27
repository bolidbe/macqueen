# McQueen

McQueen is the design system at bolid. Though its primary purpose to support bolid projects, we have open-sourced it for those interested in how we build and manage our design system.

## Overview

The McQueen codebase is a monorepo containing individually versioned NPM packages. These packges include:

| Package | Version |
| --- | --- |
| [`@bolid/mcqueen-icons`](/packages/mcqueen-icons) | [![npm version](https://badgen.net/npm/v/@bolid/mcqueen-icons)](https://npmjs.com/package/@bolid/mcqueen-icons) |
| [`@bolid/mcqueen-scss`](/packages/mcqueen-scss) | [![npm version](https://badgen.net/npm/v/@bolid/mcqueen-scss)](https://npmjs.com/package/@bolid/mcqueen-scss) |
| [`@bolid/mcqueen-react`](/packages/mcqueen-react) | [![npm version](https://badgen.net/npm/v/@thumbtack/mcqueen-react)](https://npmjs.com/package/@bolid/mcqueen-react) |

## Installation

The package can be installed via npm:

```bash
npm i @bolid/mcqueen-react --save
```

Or via yarn:

```bash
yarn add @bolid/mcqueen-react
```

## Usage

Gestalt exports each component as ES6 modules and a single, precompiled CSS file:

```js
import { Title } from '@bolid/mcqueen-react';
import '@bolid/mcqueen-react/dist/styles.css';
```

That syntax is Webpack specific (and will work with Create React App), but you can use Gestalt anywhere that supports ES6 module bundling and global CSS.


## License

Thumbprint is licensed under the terms of the [Apache License 2.0](LICENSE).
