export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: 'https://dummyjson.com',
    })

    const testVariable = 'test'

    return {
        provide: {
            api,
            testVariable,
        },
    }
})