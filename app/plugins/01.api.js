export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: 'https://dummyjson.com',
    })

    return {
        provide: {
            api,
        },
    }
})