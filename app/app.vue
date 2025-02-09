<template>
    <!-- <NuxtLayout :name="layout" :key="initializationStatus">
        <NuxtLoadingIndicator />
        <NuxtPage :name="initializationStatus === 'success' ? undefined : ''" :key="initializationStatus" />
    </NuxtLayout> -->
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
// const layout = computed(() => initializationStatus.value === 'success' ? 'default' : 'spa-loading-template')
// const { initializationStatus, initializeNuxtApp } = await useInitializeNuxtApp()

// onBeforeMount(async () => {
    // await initializeNuxtApp()
// })
</script>