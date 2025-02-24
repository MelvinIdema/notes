<script lang="ts" setup>
/**
 * When you fetch all products, you can than retrieve the products from the cache
 * For example, to display a single product.
 *
 * https://nuxt.com/docs/api/composables/use-nuxt-data#example 
 */

const { data: products } = await useLazyFetch('https://fakestoreapi.com/products', { key: 'products' })
</script>

<template>
    <Alert variant="info" class="mb-4">
        <LucideAlertCircle class="w-4 h-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>I'm still heavily working on this page. Sorry!</AlertDescription>
    </Alert>
    <ul class="space-y-2">
        <li v-for="product in products" :key="product.id">
            <NuxtLink :to="`/caching/03.placeholder-caching/${product.id}`" class="text-blue-500 underline hover:text-blue-600">
                {{ product.title }}
            </NuxtLink>
        </li>
    </ul>
</template>