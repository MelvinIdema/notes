<script lang="ts" setup>
/**
 * Persistent Caching
 */
const product = ref()
const productId = ref(1)
const cachedData = ref(new Map())
const cacheId = computed(() => `product-${productId.value}`)
let abortController = new AbortController()

const productUrl = computed(() => `https://fakestoreapi.com/products/${productId.value}`)
const { data, execute } = await useAsyncData(cacheId.value, () => $fetch(productUrl.value, { signal: abortController.signal }))

watch(productId, async () => {
  if (cachedData.value.has(cacheId.value)) {
    abortController.abort()
    product.value = cachedData.value.get(cacheId.value)
  } else {
    abortController = new AbortController()
    await execute()
    product.value = data.value
    cachedData.value.set(cacheId.value, data.value)
  }
}, { immediate: true })
</script>

<template>
<div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Data Fetching Caching</h1>
        <p class="text-muted-foreground">How to implement persistent caching with useAsyncData.</p>
      </div>
      <div class="flex gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Caching IDs in a Product</CardTitle>
            <CardDescription>
              Click on a button to fetch the next product ID.
              See the console for the useNuxtData() output.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="info" class="mb-4">
              <LucideAlertCircle class="w-4 h-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>I'm still working on providing code examples for this page.</AlertDescription>
            </Alert>
            <div class="grid grid-cols-2 gap-4 place-items-center">
              <div class="flex gap-4">
                <Button @click="productId--" :disabled="productId === 1">Fetch Previous Product ID</Button>
                <Button @click="productId++">Fetch Next Product ID</Button>
              </div>
              <div v-if="product" class="w-full p-4 rounded-lg bg-muted">
                <pre class="whitespace-pre-wrap break-words"><code>{{ JSON.stringify(product, null, 2) }}</code></pre>
              </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
</template>