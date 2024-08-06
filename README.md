# GoatCounter JS

_Copyright 2024 Caleb Evans_  
_Released under the MIT license_

GoatCounter JS is an (unofficial) JavaScript library that simplifies integrating
[GoatCounter][goatcounter] into any JS framework. The API is small,
TypeScript-compatible, and fully tree-shakable for the GoatCounter functions you
actually use.

[goatcounter]: https://www.goatcounter.com/

## Setup

You can install GoatCounter via your preferred package manager (like npm, yarn,
or pnpm):

```sh
npm install goatcounter-js
```

The basic usage is importing goatcounter, calling `goatcounter.initialize()`,
then calling `goatcounter.count()`. **You will probably want to pass `{
no_onload: true }` in most cases.**

```ts
import * as goatcounter from "goatcounter-js";

// Configure how GoatCounter will be loaded
goatcounter.initialize({
  // Loads GoatCounter v4 script with SRI;
  // see <https://www.goatcounter.com/help/countjs-versions>
  scriptVersion: 4,
  // Define the endpoint containing your site code, as usual
  endpointUrl: "https://MYCODE.goatcounter.com/count",
  // Define your settings here (no need to stringify!);
  // see <https://www.goatcounter.com/help/js#settings-421>
  // for all available settings
  settings: { no_onload: true, allow_local: true },
});

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

## Settings & Methods

GoatCounter JS supports all the same [settings][settings] as the official
JavaScript API, including the same defaults. Similarly, all the same
[methods][methods] are supported, including `count()`, `get_query()`, and
others. The only difference is that these methods are async / return promises to
ensure that GoatCounter is actually loaded on the page first.

[settings]: https://www.goatcounter.com/help/js#settings-423
[methods]: https://www.goatcounter.com/help/js#methods-423

## Self-Hosted GoatCounter

If you have a self-hosted installation of GoatCounter, you only need to specify
the custom URLs when initializing `goatcounter-js` (namely, the `scriptSrc` and `endpointUrl` properties):

```ts
import * as goatcounter from "goatcounter-js";

goatcounter.initialize({
  scriptSrc: "https://www.yourwebsite.com/count.js",
  endpointUrl: "https://insights.yourwebsite.com/count",
  settings: { no_onload: true, allow_local: true },
});

// ...
```
