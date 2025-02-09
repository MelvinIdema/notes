<script setup>
/**
 * These are more options you can pass to useFetch
 * https://nuxt.com/docs/api/composables/use-fetch
 */
const { data, execute } = await useFetch('/api/randomUser', {
  // The HTTP method
  method: 'GET',
  // The request headers
  headers: {
    'Content-Type': 'application/json',
  },
  // The request body, only used for POST requests
  // body: {
  //   name: 'John Doe',
  // },
  // Wait for an interaction before making the request
  immediate: false,
  // Dedupe will control how duplicate requests are handled
  // Defer will allow only one request to be made
  // Cancel will cancel all duplicate requests
  // "defer" || "cancel"
  dedupe: "defer",
  // Make sure the request is made on the client
  server: false,
  // Default data before the request is made
  default() {
    return {
      message: 'Default data',
    };
  },
});

const configCode = `const { data, execute } = await useFetch('/api/randomUser', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  immediate: false,
  dedupe: "defer",
  server: false,
  default() {
    return {
      message: 'Default data',
    };
  },
});`
</script>

<template>
  <main>
    <div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Configuration Options</h1>
        <p class="text-muted-foreground">
          useFetch and useAsyncData both have different configuration options to control how requests are made.
        </p>
        <p class="text-muted-foreground">
          To see all configuration options for useFetch, visit the <NuxtLink class="text-blue-500" to="https://nuxt.com/docs/api/composables/use-fetch" target="_blank">Nuxt.com Documentation</NuxtLink>.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">Behavior Options</CardTitle>
            <CardDescription>
              Configure how and when requests are made.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="mb-2 text-muted-foreground">
              - <strong>immediate:</strong> Wait for interaction before requesting<br>
              - <strong>dedupe:</strong> Handle duplicate requests (defer/cancel)<br>
              - <strong>server:</strong> Control server/client rendering<br>
              - <strong>default:</strong> Provide default data
            </p>
            <Button class="mb-2 w-full" @click="execute">Execute Request</Button>
            <pre class="p-4 rounded bg-muted">{{ data }}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">Request Options</CardTitle>
            <CardDescription>
              Control the HTTP method, headers and body of your requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="mb-2 text-muted-foreground">
              - <strong>method:</strong> The HTTP method (GET, POST, etc)<br>
              - <strong>headers:</strong> Custom request headers<br>
              - <strong>body:</strong> Request body for POST requests
            </p>
          </CardContent>
        </Card>
        <Card class="col-span-2">
          <CardContent class="mt-6">
            <CodeBlock :code="configCode" lang="typescript" />
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
