export const fetchCode =  `const { data: products } = await useLazyFetch('https://fakestoreapi.com/products', { key: 'products' })`

export const getCode = `const { id } = useRoute().params

const { data: product } = await useLazyFetch(\`https://fakestoreapi.com/products/\${id}\`, {
    default() {
        const { data: products } = useNuxtData('products')
        return products.value?.find((product) => product.id === parseInt(id))
    }
})`