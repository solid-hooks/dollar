import { createResource } from 'solid-js'
import type {
  InitializedResource,
  InitializedResourceOptions,
  NoInfer,
  Resource,
  ResourceActions,
  ResourceFetcher,
  ResourceOptions,
  ResourceSource,
} from 'solid-js'

type AddPrefix$ToKeys<T extends Record<string, any>> = {
  [K in keyof T as `$${string & K}`]: T[K];
}
type BaseResourceObject<
  T,
  R,
  Is,
  Actions = ResourceActions<Is extends true ? T : (T | undefined), R>,
> = (Is extends true ? InitializedResource<T> : Resource<T>)
& AddPrefix$ToKeys<{
  [K in keyof Actions]: Actions[K]
}>

/**
 * type of {@link $resource} with initalized value
 */
export type InitializedResourceObject<T, R> = BaseResourceObject<T, R, true>

/**
 * type of {@link $resource}
 */
export type ResourceObject<T, R> = BaseResourceObject<T, R, false>

/**
 * object wrapper for {@link createResource}
 * @see https://github.com/subframe7536/solid-dollar#resource
 */
export function $resource<T, R = unknown>(
  fetcher: ResourceFetcher<true, T, R>,
  options: InitializedResourceOptions<NoInfer<T>, true>,
): InitializedResourceObject<T, R>
/**
 * object wrapper for {@link createResource}
 * @see https://github.com/subframe7536/solid-dollar#resource
 */
export function $resource<T, R = unknown>(
  fetcher: ResourceFetcher<true, T, R>,
  options?: ResourceOptions<T, true>,
): ResourceObject<T, R>
/**
 * object wrapper for {@link createResource} with signal
 * @see https://github.com/subframe7536/solid-dollar#resource
 */
export function $resource<T, S, R = unknown>(
  source: ResourceSource<S>,
  fetcher: ResourceFetcher<S, T, R>,
  options: InitializedResourceOptions<NoInfer<T>, S>,
): InitializedResourceObject<T, R>
/**
 * object wrapper for {@link createResource} with signal
 * @see https://github.com/subframe7536/solid-dollar#resource
 */
export function $resource<T, S, R = unknown>(
  source: ResourceSource<S>,
  fetcher: ResourceFetcher<S, T, R>,
  options?: ResourceOptions<T, S>,
): ResourceObject<T, R>
export function $resource(...args: any[]) {
  // @ts-expect-error args
  const [data, { mutate, refetch }] = createResource(...args)
  // @ts-expect-error assign
  data.$mutate = mutate
  // @ts-expect-error assign
  data.$refetch = refetch
  return data as any
}
