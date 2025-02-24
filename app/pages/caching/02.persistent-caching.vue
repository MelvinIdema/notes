<script lang="ts" setup>
import exampleCode from './02.example.js'

/**
 * Persistent Caching
 */
const product = ref()
const productId = ref(1)
const cachedData = ref(new Map())
const cacheId = computed(() => `product-${productId.value}`)
const networkActivity = ref<{ network: boolean, request: string, randomId: number }[]>([])

let abortController = new AbortController()
const productUrl = computed(() => `https://fakestoreapi.com/products/${productId.value}`)
const { data, execute } = await useFetch(productUrl.value, { signal: abortController.signal })

watch(productId, async () => {
  if (cachedData.value.has(cacheId.value)) {
    abortController.abort()
    networkActivity.value.push({ network: false, request: productUrl.value, randomId: Math.random() })
    product.value = cachedData.value.get(cacheId.value)
  } else {
    abortController = new AbortController()
    await execute()
    product.value = data.value
    cachedData.value.set(cacheId.value, data.value)
  }
}, { immediate: true })

watch(data, () => {
  networkActivity.value.push({ network: true, request: productUrl.value, randomId: Math.random() });
})
</script>

<template>
<div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Data Fetching Caching</h1>
        <p class="text-muted-foreground">How to implement persistent caching with useAsyncData.</p>
      </div>
        <Card>
          <CardHeader>
            <CardTitle>Persistent Caching</CardTitle>
            <CardDescription class="w-2/3">
              Easily implement persistent caching with useFetch, an abortController and a Map.
              You could use a global state management library like Pinia to store the Map or even store it in localStorage.
              Keep in mind that you need to handle cache invalidation when the data is updated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-2 gap-4 w-full">
              <div class="space-y-4">
                <CodeBlock :code="exampleCode" lang="typescript" />
              </div>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <Button class="flex-1" @click="productId--" :disabled="productId === 1">Fetch Previous Product ID</Button>
                  <Button class="flex-1" @click="productId++">Fetch Next Product ID</Button>
                </div>
                <div class="flex flex-col">
                  <div class="w-full p-4 rounded-lg bg-muted flex-1">
                    <pre v-if="product" class="whitespace-pre-wrap break-words h-[214px] overflow-y-auto"><code>{{ JSON.stringify(product, null, 2) }}</code></pre>
                  </div>
                  <div class="mt-4 rounded-lg border border-border overflow-hidden flex-1">
                    <div class="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                      <div class="flex gap-2 items-center">
                        <div class="w-3 h-3 bg-red-400 rounded-full opacity-80" />
                        <div class="w-3 h-3 bg-yellow-400 rounded-full opacity-80" />
                        <div class="w-3 h-3 bg-green-400 rounded-full opacity-80" />
                      </div>
                      <div class="text-sm font-medium text-gray-600">Network Activity</div>
                    </div>
                    <div class="p-4 space-y-2 h-[160px] overflow-y-auto">
                      <div v-for="request in [...networkActivity].reverse()" :key="request.randomId" class="flex items-center justify-between py-2 px-3 border-b last:border-b-0 border-border/50" :class="!request.network ? 'bg-green-50' : 'bg-blue-50'">
                        <div class="flex items-center gap-3">
                          <div class="w-2 h-2 rounded-full" :class="!request.network ? 'bg-green-500' : 'bg-blue-500'" />
                          <span class="text-sm font-medium">{{ request.request }}</span>
                        </div>
                        <div class="text-xs" :class="!request.network ? 'text-green-500' : 'text-blue-500'">
                          {{ request.network ? 'Network' : 'Cached' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
</template>