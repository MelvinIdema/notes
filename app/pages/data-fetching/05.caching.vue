<script setup>
/**
 * useFetch will cache the data by default and uses the URL as the key.
 * If you want to cache the data by a different key, 
 * you can do so by passing 'key' as an option.
 */
const { data: fetchData, refresh: fetchRefresh } = await useLazyFetch('/api/randomUser', {
  query: {
    randomNumber: Math.random().toString(),
  },
  // See how the previous data is there for a second.
  // Disable this to see the data being wiped out.
  key: 'randomUser',
});

/**
 * useAsyncData will cache the data by default and uses the key as the key.
 * If you want to cache the data by a different key, 
 * you can do so by passing 'key' as an option.
 * 
 * Note the "lazy" here as well. Both useFetch and useAsyncData can
 * have "lazy"in their names too to make them lazy loaded.
 */
const randomUser = ref(Math.random().toString());
const { data: asyncData, refresh: asyncRefresh } = await useLazyAsyncData(randomUser.value, () => $fetch('/api/randomUser', {
  query: {
    randomNumber: randomUser.value,
  },
}));

/**
 * getCachedData is an option you can pass to useFetch
 * This is useful if you want to get the cached data without making a new request.
 * See how navigating away and back to this page shows the cached data.
 * Even though the other requests do get made, this one doesn't.
 */
const { data: getCachedData } = await useLazyFetch('/api/randomUser', {
  // Transform will transform the data from useFetch
  transform(data) {
    // Add an expiresAt property to the data
    return {
      ...data,
      // 10 seconds from now
      expiresAt: Date.now() + 10_000,
    }
  },
  getCachedData(key, nuxtApp) {
    // You can get the cached data by tapping into the payload.data with the key
    // Or with Static Site Generation with nuxtApp.static
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    // Returning the data will use the cached data
    // Returning undefined will make it make a new request
    // Our added expiresAt property determines if the data is still valid
    return Date.now() >= data?.expiresAt ? undefined : data;
  }
});

const useFetchCode = `const { data: fetchData, refresh: fetchRefresh } = await useLazyFetch('/api/randomUser', {
  query: { randomNumber: Math.random().toString() },
  key: 'randomUser',
});`

const useAsyncDataCode = `const randomUser = ref(Math.random().toString());
const { data: asyncData, refresh: asyncRefresh } = await useLazyAsyncData(randomUser.value, () => $fetch('/api/randomUser', {
  query: { randomNumber: randomUser.value },
}));`

const getCachedDataCode = `const { data: getCachedData } = await useLazyFetch('/api/randomUser', {
  // Transform will transform the data from useFetch
  transform(data) {
    // Add an expiresAt property to the data
    return {
      ...data,
      expiresAt: Date.now() + 10_000,
    }
  },
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return Date.now() >= data?.expiresAt ? undefined : data;
  }
});`
</script>

<template>
  <main>
    <div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Data Fetching Caching</h1>
        <p class="text-muted-foreground">Using useFetch and useAsyncData to cache data.</p>
      </div>
      <div class="space-y-4">
      
        <!-- useFetch -->
        <Card>
          <CardHeader>
            <CardTitle>useFetch</CardTitle>
            <CardDescription>
              useFetch will cache the data by default and uses the URL as the key.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid grid-cols-[60%_40%]">
            <CodeBlock :code="useFetchCode" class="mr-6" />
            <Card>
              <CardContent class="grid place-items-center">
                <div class="mb-2">
                  <Button class="mt-6 mb-2 w-full" @click="fetchRefresh">Refresh Data</Button>
                  <pre class="whitespace-pre-wrap">{{ fetchData }}</pre>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <!-- useAsyncData --> 
        <Card>
          <CardHeader>
            <CardTitle>useAsyncData</CardTitle>
          <CardDescription>
            useAsyncData will cache the data by default and requires manual key setting.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-[60%_40%]">
          <CodeBlock :code="useAsyncDataCode" class="mr-6" />
          <Card>
            <CardContent class="grid place-items-center">
              <div class="mt-4">
                <Button class="mb-2 w-full" @click="asyncRefresh">Refresh Data</Button>
                <pre class="whitespace-pre-wrap">{{ asyncData }}</pre>
              </div>
            </CardContent>
          </Card>
          </CardContent>
        </Card>

        <!-- getCachedData -->
        <Card>
          <CardHeader>
            <CardTitle>getCachedData <span class="italic">(Expires in 10 seconds)</span></CardTitle>
          <CardDescription>
            <p class="mb-2 text-muted-foreground">getCachedData is an option you can pass to useFetch to get the cached data without making a new request or invalidate the cache.</p>
            <p class="text-muted-foreground">See how navigating away and back to this page shows the cached data. Even though the other requests do get made, this one doesn't.</p>
          </CardDescription>
        </CardHeader>
          <CardContent class="grid grid-cols-[60%_40%]">  
            <CodeBlock :code="getCachedDataCode" class="mr-6" />
            <Card>
              <CardContent class="grid place-items-center">
                <div class="mt-4">
                  <Button class="mb-2 w-full" @click="getCachedDataRefresh">Refresh Data</Button>
                  <pre class="whitespace-pre-wrap">{{ getCachedData }}</pre>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>