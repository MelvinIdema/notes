<template>
    <div class="mb-6 flex items-center">
        <NuxtLink 
            to="/caching/03.placeholder-caching" 
            class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to products
        </NuxtLink>
    </div>
    <div v-if="product">
        <h1>{{ product.title }}</h1>
    </div>
    <div v-else>
        <p>Product not found</p>
    </div>
</template>

<script lang="ts" setup>
const { id } = useRoute().params

const { data: product, status } = await useLazyFetch(`https://fakestoreapi.com/products/${id}`, {
    default() {
        const { data: products } = useNuxtData('products')
        return products.value?.find((product) => product.id === parseInt(id))
    }
})

const emit = defineEmits<{
    (e: 'network-activity', activity: { network: boolean, request: string, randomId: number }): void
    (e: 'page-load', url: string): void
}>()

emit('page-load', `https://fakestoreapi.com/products/${id}`)
emit('network-activity', { network: false, request: `https://fakestoreapi.com/products/${id}`, randomId: Math.random() })
emit('network-activity', { network: true, request: `https://fakestoreapi.com/products/${id}`, randomId: Math.random() })
</script>