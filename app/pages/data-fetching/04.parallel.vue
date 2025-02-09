<script lang="ts" setup>
/**
 * When a page needs data from multiple sources, it can take up a lot of time:
 * 
 * console.time('Synchronous Fetching');
 * const { data: duration1 } = await useFetch('/api/1000');
 * const { data: duration2 } = await useFetch('/api/2000');
 * const { data: duration3 } = await useFetch('/api/3000');
 * console.timeEnd('Synchronous Fetching'); // This takes over 6000ms!
 * 
 * This is where parallel fetching comes in.
 * Which you can do with useAsyncData:
 */
// console.time('Asynchronous Fetching');
// const { data, status } = await useLazyAsyncData(async () => {
//     return Promise.all([
//         await $fetch('/api/1000'),
//         await $fetch('/api/2000'),
//         await $fetch('/api/3000'),
//     ]);
// });
// const [duration1, duration2, duration3] = data.value ?? [];
// console.timeEnd('Asynchronous Fetching'); // This will only take 3000ms!

const slowCode = `const { data: duration1 } = await useFetch('/api/1000');
const { data: duration2 } = await useFetch('/api/2000');
const { data: duration3 } = await useFetch('/api/3000');`

const code = `const { data, status } = await useLazyAsyncData(async () => {
    return Promise.all([
        await $fetch('/api/1000'),
        await $fetch('/api/2000'),
        await $fetch('/api/3000'),
    ]);
});
// data will return an array of the data from each request.`
</script>

<template>
  <main>
    <div class="mx-auto max-w-xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Data Fetching in Parallel</h1>
        <p class="text-muted-foreground">Using useAsyncData to do parallel requests.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle class="mb-2">Promise.all()</CardTitle>
          <CardDescription>
            use Promise.all() to do parallel requests that do not depent on each other.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground">Fetching data like this will wait for each request.</p>
          <p class="mb-2 text-muted-foreground">Slowing down navigation:</p>
          <CodeBlock :code="slowCode" class="mb-4" />
          <p class="text-muted-foreground">Fetching data like this will not wait for each request.</p>
          <p class="mb-2 text-muted-foreground">Speeding up navigation:</p>
          <CodeBlock :code="code" />
        </CardContent>
      </Card>
    </div>
  </main>
</template>

<style scoped></style>