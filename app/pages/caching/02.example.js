export default `const product = ref()
const productId = ref(1)
const cachedData = ref(new Map())
const cacheId = computed(() => \`product-\${productId.value}\`)
let abortController = new AbortController()

const productUrl = computed(() => \`https://fakestoreapi.com/products/\${productId.value}\`)
const { data, execute } = await useAsyncData('product', () => $fetch(productUrl.value, { signal: abortController.signal }))

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
`