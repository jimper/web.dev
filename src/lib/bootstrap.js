/**
 * @fileoverview Site bootstrap code.
 *
 * This should not import unrelated code, and exists purely to load relevant polyfills and then
 * app.js (or TODO: entrypoints).
 */

import config from "./bootstrap-config";
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import {swapContent, normalizeUrl} from "./loader";
import * as router from "./utils/router";

console.info("web.dev", config.version);

WebComponents.waitFor(async () => {
  // Run as long-lived router w/ history & "<a>" bindings
  // Also immediately calls `swapContent()` handler for current location,
  // loading its required JS entrypoint
  router.listen(swapContent, normalizeUrl);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
