/**
 * Custom Cloudflare Worker entrypoint.
 *
 * Wraps the OpenNext-generated Next.js handler with a Basic auth gate so the
 * staging deployment can be password protected. In production the auth secrets
 * are left unset, so the gate is disabled and every request passes straight
 * through to Next.js.
 *
 * @see https://opennext.js.org/cloudflare
 * @see @inumberx/cloudflare-workers-basic-auth
 */
import { createWorkerFetch } from '@inumberx/cloudflare-workers-basic-auth'

// The OpenNext worker is emitted by `opennextjs-cloudflare build` and therefore
// only exists on disk after a build. The import is ignored for type checking so
// that `tsc` / CI stays green without a prior build (the path resolves at
// bundle time when Wrangler builds the Worker).
// oxlint-disable-next-line typescript/ban-ts-comment
// @ts-ignore -- generated at build time; the module only exists after `cf-build`
import openNextHandler from '../.open-next/worker.js'

type AssetFetcher = {
  fetch: (request: Request) => Response | Promise<Response>
}

type Env = {
  // Basic auth credentials. Set as Wrangler secrets on staging only; leaving
  // them unset disables the gate (production).
  BASIC_AUTH_USER?: string
  BASIC_AUTH_PASS?: string
  // Static asset binding provided by Cloudflare (see wrangler.jsonc).
  ASSETS: AssetFetcher
}

// Minimal shape of the Cloudflare execution context. Declared locally to avoid
// pulling in the full `@cloudflare/workers-types` globals, which redefine
// `Request` / `Response` and clash with the DOM lib used across the project.
type ExecutionContext = {
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
}

const handler = openNextHandler as {
  fetch: (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ) => Promise<Response>
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const handleFetch = createWorkerFetch<Env>({
      handler: (req) => handler.fetch(req, env, ctx),
      realm: 'after-works (staging)',
      basicAuth: (e) => ({
        user: e.BASIC_AUTH_USER,
        pass: e.BASIC_AUTH_PASS,
      }),
      assets: (e) => e.ASSETS,
    })

    return handleFetch(request, env)
  },
}
