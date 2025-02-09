<script setup>
const repositoryCode = `function useUserRepository() {
  // You can either pass the whole query to $fetch
  async function index(query) {
    // Do not await $fetch here, it will cause issues!
    return $fetch('endpoint', {
      query,
    });
  }

  async function create(payload) {
    return $fetch('endpoint', {
      method: "POST",
      body: payload,
    });
  }

  // Or you can pass specific paramaters, narrowing down the query.
  async function read(id) {
    return $fetch('endpoint', {
      query: id,
    });
  }

  async function update(payload) {
    return $fetch('endpoint', {
      method: "PUT",
      body: payload,
    });
  }

  async function destroy(id) {
    return $fetch('endpoint', {
      method: "DELETE",
      query: id,
    });
  }

  return {
    index,
    create,
    read,
    update,
    destroy,
  }
}`

const usageCode = `const userRepository = useUserRepository()

// Always use the repository inside useAsyncData
const { data, error } = useAsyncData('users', () => userRepository.index())
`



</script>

<template>
  <main>
    <div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Repositories</h1>
        <p class="text-muted-foreground">
          Instead of using useFetch directly in components, you can create repositories to centralize your API calls.
        </p>
        <p class="text-muted-foreground">
          This pattern is recommended in the <NuxtLink class="text-blue-500" to="https://nuxt.com/docs/getting-started/data-fetching" target="_blank">Nuxt.js documentation</NuxtLink>.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">Implementation</CardTitle>
            <CardDescription>
              Example of how to implement a repository.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="repositoryCode" lang="typescript" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">Usage</CardTitle>
            <CardDescription>
              Example of how to use the repository.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="usageCode" lang="typescript" />
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
