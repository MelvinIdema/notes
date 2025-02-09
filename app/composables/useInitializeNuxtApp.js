export default async function useInitializeNuxtApp() {
    const { status, execute } = await useLazyAsyncData('authentication', async () => {
        await $fetch('/api/1000')
    }, { immediate: false })

    return {
        initializationStatus: status,
        initializeNuxtApp: execute
    }
}