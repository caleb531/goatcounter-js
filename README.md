# GoatCounter JS

_Copyright 2024 Caleb Evans_  
_Released under the MIT license_

GoatCounter JS is an (unofficial) JavaScript library that simplifies integrating GoatCounter into any JS framework. The API is small, TypeScript-compatible, and fully-tree-shakable for the GoatCounter functions you actually use.

## Setup

You can install GoatCounter via your preferred package manager (like npm, yarn,
or pnpm):

```sh
npm install goatcounter-js
```

The basic usage is counting pageviews using the `count` function:

```ts
import { count } from "goatcounter-js";

// Example with React
function App() {
  // When route changes, send a pageview to GoatCounter;
  // you may need to adjust this logic depending on
  // how you handle routing in your app
  useEffect(() => {
    count();
  }, []);
}
```

If you want to namespace the GoatCounter functions, use a namespace import. This
not only groups all of the GoatCounter functions together under one object, but it preserves the tree-shakability of any individual GoatCounter function.

```ts
import * as goatcounter from "goatcounter-js";

// ...

goatcounter.count();
```
