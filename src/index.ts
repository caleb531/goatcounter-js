import versions from "./versions.json";

interface GoatCounter {
  count: typeof count;
  url: typeof url;
  filter: typeof filter;
  bind_events: typeof bind_events;
  get_query: typeof get_query;
}

// Define a basic type for the goatcounter global
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

// All available GoatCounter settings (see
// <https://www.goatcounter.com/help/js#settings-418> for a complete list)
interface GoatCounterSettings {
  no_onload?: boolean;
  no_events?: boolean;
  allow_local?: boolean;
  allow_frame?: boolean;
  endpoint?: string;
}

// The configuration for the <script> tag to be injected into the page
interface GoatCounterConfig {
  scriptSrc?: string;
  scriptVersion?: number;
  endpointUrl?: string;
  settings?: GoatCounterSettings;
}

const config: GoatCounterConfig = {};

// Initialize and load GoatCounter script with the specified configuration
export function initialize(newConfig: GoatCounterConfig): void {
  Object.assign(config, newConfig);
  load();
}

// Load GoatCounter by injecting a <script> tag to the page
export function load(): Promise<GoatCounter> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.addEventListener("load", () => {
      if (window.goatcounter) {
        resolve(window.goatcounter);
      } else {
        console.error("goatcounter script loaded but global not available");
      }
    });
    script.async = true;
    script.dataset.goatcounter = config.endpointUrl || "";
    script.dataset.goatcounterSettings = JSON.stringify(config.settings || {});
    const integrity = versions[config.scriptVersion || ""];
    if (integrity) {
      script.crossOrigin = "anonymous";
      script.integrity = integrity;
    } else {
      script.src = config.scriptSrc || "";
    }
    document.head.appendChild(script);
  });
}

// Resolve a promise when GoatCounter is fully loaded and ready to use on the
// page
export async function getGoatcounter(): Promise<GoatCounter> {
  if (window.goatcounter) {
    return window.goatcounter;
  } else {
    return load();
  }
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
