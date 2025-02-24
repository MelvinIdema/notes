<template>
    <Alert variant="info" class="mb-4">
        <LucideAlertCircle class="w-4 h-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>I'm still working on providing code examples for this page.</AlertDescription>
    </Alert>
    <div v-if="product">
        <h1>{{ product.title }}</h1>
    </div>
    <div v-else>
        <p>Product not found</p>
    </div>
</template>

<script setup>
const { id } = useRoute().params

const { data: product } = await useLazyFetch(`https://fakestoreapi.com/products/${id}`, {
    default() {
        const { data: products } = useNuxtData('products')
        return products.value?.find((product) => product.id === parseInt(id))
    }
})
</script>