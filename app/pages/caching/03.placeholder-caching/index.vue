<script lang="ts" setup>
/**
 * When you fetch all products, you can than retrieve the products from the cache
 * For example, to display a single product.
 *
 * https://nuxt.com/docs/api/composables/use-nuxt-data#example 
 */
const emit = defineEmits<{
    (e: 'network-activity', activity: { network: boolean, request: string, randomId: number }): void
    (e: 'page-load', url: string): void
}>()

const { data: cachedProducts } = useNuxtData('products')

const cached = computed(() => cachedProducts.value?.length)
emit('network-activity', { network: !cached, request: `https://fakestoreapi.com/products`, randomId: Math.random() })

const { data: products } = await useLazyFetch('https://fakestoreapi.com/products', { key: 'products' })

emit('page-load', `https://fakestoreapi.com/products`)
</script>

<template>
<ul class="divide-y divide-border h-full">
    <li v-for="product in products" :key="product.id">
        <NuxtLink :to="`/caching/03.placeholder-caching/${product.id}`" 
            class="flex items-center group transition-colors p-3 text-blue-400 underline">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-muted-foreground/10 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            </span>
            <span class="text-sm font-medium group-hover:text-blue-700 transition-colors">
                {{ product.title }}
            </span>
            <span class="text-muted-foreground ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </span>
        </NuxtLink>
    </li>
</ul>
</template>