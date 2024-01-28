<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=@solid-hooks/dollar&background=tiles&project=%20" alt="@solid-hooks/dollar">
</p>

# @solid-hooks/dollar

object style solid.js primitives

## Install

```shell
npm i @solid-hooks/dollar
```
```shell
yarn add @solid-hooks/dollar
```
```shell
pnpm add @solid-hooks/dollar
```

## Usage

### `$`

object wrapper for `createSignal`

```ts
import { $ } from '@solid-hooks/dollar'

const data = $(0)

console.log(data()) // 0
console.log(data.$set(1)) // set value
```

### `$$`

`untrack` alias

### `$memo`

object wrapper for `createMemo`

```ts
import { $, $memo } from '@solid-hooks/dollar'

const test = $('test')
const memo = $memo(() => `value: ${test()}`, { value: 'test' })
```

### `$store`

object wrapper for `createStore`

```ts
import { $store } from '@solid-hooks/dollar'

const store = $store({ test: { deep: 1 } })

store() // { test: { deep: 1 } }
store.$set('test', 'deep', 2) // set value
```

### `$resource`

object wrapper for `createResource`

```ts
import { $, $resource } from '@solid-hooks/dollar'

const fetcher = (source: string) => Promise.resolve(`${source} data`)
const source = $('source')
const data = $resource(source, fetcher, {
  initialValue: 'test'
})

data() // 'test'
data.loading // true
data.state // pending

await Promise.resolve()

data() // 'source data'
data.loading // false
data.state // ready

data.$mutate()
data.$refetch()
```

### `$effect`

normal effect, alias for `createEffect`

### `$effectRendered`

run effect after rendered, be able to access DOM, alias for `createRenderEffect`

### `$effectInstant`

run effect instantly, alias for `createComputed`

### `$deferred`

defer update notification until browser idle, alias for `createDeferred`

### `$selector`

object wrapper for `createSelector`

```tsx
import { For } from 'solid-js'
import { $selector } from '@solid-hooks/dollar'

const activeId = $selector(0)
activeId.$set(1)

return (
  <For each={list()}>
    {item => (
      <li classList={{ active: activeId.$bind(item.id) }}>
        {item.name}
      </li>
    )}
  </For>
)
```
