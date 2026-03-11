import { FetchHttpClient } from '@effect/platform'
import { Effect, Either, Layer, ManagedRuntime } from 'effect'

// ---------------------------------------------------------------------------
// App-level Layer
// ---------------------------------------------------------------------------

/**
 * Add any additional layers here (e.g. SupabaseService.Live).
 * HttpClient is provided via FetchHttpClient so all httpGet/httpPost/…
 * calls work out of the box.
 */
const AppLayer = Layer.mergeAll(FetchHttpClient.layer)

// ---------------------------------------------------------------------------
// Runtime
// ---------------------------------------------------------------------------

const runtime = ManagedRuntime.make(AppLayer)

/** Run an Effect in the app runtime, returning a Promise. */
export const runEffect = <A, E>(
  effect: Effect.Effect<A, E, Layer.Layer.Success<typeof AppLayer>>,
): Promise<A> => runtime.runPromise(effect)

/** Same as runEffect but wraps result in a success/error discriminated union.
 *  Uses Effect.either so the typed error E is always preserved — never wrapped
 *  in a FiberFailure exception.
 */
export const runEffectSafe = async <A, E>(
  effect: Effect.Effect<A, E, Layer.Layer.Success<typeof AppLayer>>,
): Promise<{ success: true; data: A } | { success: false; error: E }> => {
  const result = await runEffect(Effect.either(effect))
  if (Either.isLeft(result)) {
    return { success: false, error: result.left }
  }
  return { success: true, data: result.right }
}
