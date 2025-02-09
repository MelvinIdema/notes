<script lang="ts" setup>
/**
 * You can add a watch option to the useFetch
 * to refetch the data when the ref changes.
 * This needs a computed URL to work.
 */
const watchedSearch = ref('');
const watchedCommittedSearch = ref('');
const watchedUrl = computed(() => `https://dummyjson.com/users/search?q=${watchedCommittedSearch.value}`);
const { data: watchedData, status: watchedStatus } = await useFetch(watchedUrl, {
    lazy: true,
    watch: [watchedCommittedSearch],
});
const watchedUsers = computed(() => watchedData.value?.users);

/**
 * Or you can add a query option to the useFetch
 * to refetch the data when that query changes.
 * This doesn't require a computed URL.
 */
const querySearch = ref('');
const queryCommittedSearch = ref('');    
const { data: queryData, status: queryStatus } = await useFetch('https://dummyjson.com/users/search', {
    lazy: true,
    query: {
        q: queryCommittedSearch,
    }
});
const queryUsers = computed(() => queryData.value?.users);

/**
 * Code blocks
 */
const watchedCode = `const watchedSearch = ref('');
const watchedCommittedSearch = ref('');
const watchedUrl = computed(() => \`https://dummyjson.com/users/search?q=\${watchedCommittedSearch.value}\`);
const { data: watchedData, status: watchedStatus } = await useLazyFetch(watchedUrl, {
    watch: [watchedCommittedSearch],
});
const watchedUsers = computed(() => watchedData.value?.users);
`

const watchedTemplate = `<template>
    <form @submit.prevent="watchedCommittedSearch = watchedSearch" class="flex gap-1">
        <Input type="text" v-model="watchedSearch" />
        <Button type="submit">Search</Button>
    </form>
</template>
`

const queryCode = `const querySearch = ref('');
const queryCommittedSearch = ref('');    
const { data: queryData, status: queryStatus } = await useLazyFetch('https://dummyjson.com/users/search', {
    query: { q: queryCommittedSearch }
});
const queryUsers = computed(() => queryData.value?.users);

`

const queryTemplate = `<template>
    <form @submit.prevent="queryCommittedSearch = querySearch" class="flex gap-1">
        <Input type="text" v-model="querySearch" />
        <Button type="submit">Search</Button>
    </form>
</template>
`
</script>

<template>
<main>
  <div class="mx-auto max-w-5xl h-full">
    <!-- Header -->
    <div class="pb-4 mb-4 border-b border-border">
      <h1 class="mb-2 text-2xl font-bold">Data Fetching Approaches</h1>
      <p class="text-muted-foreground">Compare different methods for handling data fetching in Vue applications.</p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Watch-based Section -->
      <Card>
        <CardHeader>
          <CardTitle>Watch-based Fetching</CardTitle>
          <CardDescription>
            Using the watch option with useFetch allows you to refetch data when a ref changes. 
            This approach requires a computed URL.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col">
          
            <!-- Watch-based Demo -->
            <form @submit.prevent="watchedCommittedSearch = watchedSearch" class="flex gap-2 items-center">
                <Input type="text" v-model="watchedSearch" placeholder="Search users..." />
                <Button type="submit">Search</Button>
            </form>   

            <!-- Results -->
            <ScrollArea v-if="queryUsers" class="relative mt-4 h-[210px]" as="ul">
                <div class="absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent pointer-events-none from-card" />
                <li v-for="user in watchedUsers" :key="user.id" 
                    class="p-3 mb-2 rounded-md border border-border">
                {{ user.firstName }} {{ user.lastName }}
                </li>
            </ScrollArea>
            
            <!-- Code Blocks -->
            <Tabs default-value="typescript" class="mt-8">
              <TabsList class="grid grid-cols-2 w-full">
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="vue">Vue Template</TabsTrigger>
              </TabsList>
              <TabsContent value="typescript">
                <CodeBlock 
                  :code="watchedCode"
                  lang="typescript"
                />
              </TabsContent>
              <TabsContent value="vue">
                <CodeBlock
                  :code="watchedTemplate"
                  lang="vue"
                />
              </TabsContent>
            </Tabs>
        </CardContent>
      </Card>

      <!-- Query-based Section -->
      <Card>
        <CardHeader>
          <CardTitle>Query-based Fetching</CardTitle>
          <CardDescription>
            Using the query option with useFetch provides a cleaner way to handle URL parameters. 
            No computed URL is needed.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col">
          
          <!-- Query-based Demo --> 
            <form @submit.prevent="queryCommittedSearch = querySearch" class="flex gap-2 items-center">
                <Input type="text" v-model="querySearch" placeholder="Search users..." />
                <Button type="submit">Search</Button>
            </form>

            <!-- Results -->
            <ScrollArea v-if="queryUsers" class="relative mt-4 h-[210px]" as="ul">
              <div class="absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent pointer-events-none from-card" />
              <li v-for="user in queryUsers" :key="user.id" 
                   class="p-3 mb-2 rounded-md border border-border">
                {{ user.firstName }} {{ user.lastName }}
              </li>
            </ScrollArea>
            
            <!-- Code Blocks -->
            <Tabs default-value="typescript" class="mt-8">
              <TabsList class="grid grid-cols-2 w-full">
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="vue">Vue Template</TabsTrigger>
              </TabsList>
              <TabsContent value="typescript">
                <CodeBlock 
                  :code="queryCode"
                  lang="typescript"
                />
              </TabsContent>
              <TabsContent value="vue">
                <CodeBlock
                  :code="queryTemplate"
                  lang="vue"
                />
              </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  </div>
</main>
</template>