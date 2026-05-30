// OpenNext configuration for Cloudflare Workers.
// Docs: https://opennext.js.org/cloudflare
import { defineCloudflareConfig } from '@opennextjs/cloudflare'

export default defineCloudflareConfig({
  // No incremental cache / queue / tag cache overrides are configured.
  // The site is fully SSR (`force-dynamic`) and fetches the Kuroco CMS with
  // `cache: 'no-store'`, so the default (no-op) caching behaviour is sufficient.
})
