// Vue 3 Migration: Filters are removed in Vue 3
// These functions have been moved to src/utils/filters.js
// Components should import and use them as regular functions or computed properties

import { fromUnixTime, prettifyDate, truncate } from "@/utils/filters";

export {
  fromUnixTime,
  prettifyDate,
  truncate
};
