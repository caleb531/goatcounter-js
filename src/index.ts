// Define a basic type for the goatcounter global
declare global {
  interface Window {
    goatcounter?: {
      count: typeof count;
      url: typeof url;
      filter: typeof filter;
      bind_events: typeof bind_events;
      get_query: typeof get_query;
    };
  }
}

// Resolve a promise when GoatCounter is fully loaded and ready to use on the
// page
export async function getGoatcounter(): Promise<
  NonNullable<typeof window.goatcounter>
> {
  return new Promise((resolve) => {
    if (window.goatcounter) {
      return resolve(window.goatcounter);
    }
    const script = document.createElement("script");
    script.addEventListener("load", () => {
      if (window.goatcounter) {
        resolve(window.goatcounter);
      } else {
        console.log("goatcounter script loaded but global not available");
      }
    });
    script.async = true;
    // TODO: eliminate the hardcoded URLs and checksum
    script.dataset.goatcounter = `https://${process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID}.goatcounter.com/count`;
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    script.src = "https://gc.zgo.at/count.v4.js";
    script.crossOrigin = "anonymous";
    script.integrity =
      "sha384-nRw6qfbWyJha9LhsOtSb2YJDyZdKvvCFh0fJYlkquSFjUxp9FVNugbfy8q1jdxI+";
    document.head.appendChild(script);
  });
}

// The data parameters that can be passed to goatcounter.count() or
// goatcountre.url(); see
// <https://www.goatcounter.com/help/js#data-parameters-418>
interface GoatCounterDataParameters {
  path?: string;
  title?: string;
  referrer?: string;
  event?: boolean;
}

// Count a single pageview with GoatCounter
export async function count(
  { path, title, referrer, event }: GoatCounterDataParameters = {
    // GoatCounter's count() function normally requires the path to be
    // specified, but this library adds a sensible default to simplify usage
    // further
    path: location.pathname + location.search + location.hash,
  },
): Promise<void> {
  const goatcounter = await getGoatcounter();
  goatcounter.count({ path, title, referrer, event });
}

// Retrieve the URL to send to GoatCounter
export async function url(
  { path, title, referrer, event }: GoatCounterDataParameters = {
    // GoatCounter's count() function normally requires the path to be
    // specified, but this library adds a sensible default to simplify usage
    // further
    path: location.pathname + location.search + location.hash,
  },
): Promise<void> {
  const goatcounter = await getGoatcounter();
  goatcounter.url({ path, title, referrer, event });
}

// Determine if this request should be filtered and *not* sent to GoatCounter
export async function filter(): Promise<string | false> {
  const goatcounter = await getGoatcounter();
  return goatcounter.filter();
}

// Determine if this request should be filtered and *not* sent to GoatCounter
export async function bind_events(): Promise<void> {
  const goatcounter = await getGoatcounter();
  goatcounter.bind_events();
}

// Return the value for a single query parameter (with the given name) from the
// current page's URL
export async function get_query(name: string): Promise<void> {
  const goatcounter = await getGoatcounter();
  return goatcounter.get_query(name);
}
