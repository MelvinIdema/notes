<script lang="ts" setup>
import { fetchCode, getCode } from './03.example.js'

const networkActivity = ref<{ network: boolean, request: string, randomId: number }[]>([])

const handleNetworkActivity = (activity: { network: boolean, request: string, randomId: number }) => {
    networkActivity.value.push(activity)
}

const url = ref('https://fakestoreapi.com/products')
const handlePageLoad = (newUrl: string) => url.value = newUrl
</script>

<template>
<main>
    <div class="mx-auto max-w-5xl h-full">
        <!-- Header -->
        <div class="pb-4 mb-4 border-b border-border">
            <h1 class="mb-2 text-2xl font-bold">Placeholder Caching</h1>
            <p class="text-muted-foreground">By utilizing <code>useNuxtData</code> we can tap into the build-in caching with the key and provide it as a default value to the <code>useFetch</code> composable. This way we can immediatly show content and fetch the data in the background.</p>
        </div>

        <section class="grid grid-cols-2 gap-4">
            
            <!-- Code -->
            <div class="space-y-4">
                <CodeBlock :code="fetchCode" />
                <CodeBlock :code="getCode" />
            </div>

            <div>
                <!-- Browser -->
                <div class="rounded-lg overflow-hidden border border-border shadow-lg w-full aspect-video">
                    <!-- Mac OS Browser Header -->
                    <div class="bg-gray-100 dark:bg-gray-800 p-2 pt-4 flex items-center border-b border-border relative">
                        <div class="flex space-x-2 items-center">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="mx-auto flex items-center px-4 py-1 rounded-md bg-white dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-300 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {{ url }}
                        </div>
                    </div>
                
                    <!-- Browser Content -->
                    <div class="bg-white dark:bg-gray-900 p-4 overflow-y-auto h-full">
                        <NuxtPage @network-activity="handleNetworkActivity" @page-load="handlePageLoad" />
                    </div>
                </div>
                <div class="mt-4 rounded-lg border border-border overflow-hidden flex-1">
                    <div class="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                      <div class="flex gap-2 items-center">
                        <div class="w-3 h-3 bg-red-400 rounded-full opacity-80" />
                        <div class="w-3 h-3 bg-yellow-400 rounded-full opacity-80" />
                        <div class="w-3 h-3 bg-green-400 rounded-full opacity-80" />
                      </div>
                      <div class="text-sm font-medium text-gray-600">Network Activity</div>
                    </div>
                    <div class="p-4 space-y-2 h-[160px] overflow-y-auto bg-white">
                      <div v-for="request in [...networkActivity].reverse()" :key="request.randomId" class="flex items-center justify-between py-2 px-3 border-b last:border-b-0 border-border/50" :class="!request.network ? 'bg-green-50' : 'bg-blue-50'">
                        <div class="flex items-center gap-3">
                          <div class="w-2 h-2 rounded-full" :class="!request.network ? 'bg-green-500' : 'bg-blue-500'" />
                          <span class="text-sm font-medium">{{ request.request }}</span>
                        </div>
                        <div class="text-xs" :class="!request.network ? 'text-green-500' : 'text-blue-500'">
                          {{ request.network ? 'Network' : 'Cached' }}
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </section>
    </div>
</main>
</template>