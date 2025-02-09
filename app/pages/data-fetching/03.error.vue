<script setup>
const queryError = ref(useRoute().query?.error ?? undefined);

const { data, error } = await useFetch('/api/error', {
  query: {
    error: queryError,
  }
});

if (error.value) {
  throw createError({
    ...error.value,
    fatal: true,
  });
}

const fetchWithError = () => {
  console.log("ofetch will try a request again if an error occurs. Hence why the request is done twice.")
  queryError.value = true;
}

const refreshWithError = () => {
  return window.location.href = '/data-fetching/03.error?error=true';
}

const unwatch = useRouter().afterEach(() => {
  if (queryError.value) {
    queryError.value = undefined;
  }
});

onBeforeUnmount(() => {
  unwatch();
});

const typescriptCode = `const { data, error } = await useFetch('/api/error');

// Initial error handling.
// Fatal will trigger the error page.
if (error.value) {
  throw createError({ ...error.value, fatal: true });
}

// watchEffect triggers when error is updated.
watchEffect(() => {
  if (error.value) { /* Handle the error gracefully */ }
})
`

const vueCode = `<!-- You can just check the error in the template. -->
<Alert v-if="error" variant="destructive" class="mb-4">
  <LucideAlertCircle class="w-4 h-4" />
  <AlertTitle>Error {{ error?.statusCode }}</AlertTitle>
  <AlertDescription>
    {{ error?.statusMessage }}
  </AlertDescription>
</Alert>
`
</script>

<template>
  <main>
    <div class="mx-auto max-w-xl h-full">
      <!-- Header -->
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Data Fetching Error Handling</h1>
        <p class="text-muted-foreground">How to handle errors in data fetching with useFetch.</p>
      </div>

      <!-- Error Handling Demo -->
       <Alert v-if="error" variant="destructive" class="mb-4">
        <LucideAlertCircle class="w-4 h-4" />
        <AlertTitle>Error {{ error?.statusCode }}</AlertTitle>
        <AlertDescription>
          {{ error?.statusMessage }}
        </AlertDescription>
      </Alert>

      <!-- Error Handling Demo -->
      <Card>
        <CardHeader>
          <CardTitle class="flex justify-between items-center mb-2">
            <span>Error Handling</span>
            <div class="flex gap-2">
              <Button @click="fetchWithError">Fetch Error</Button>
              <Button @click="refreshWithError">Refresh Page with Error</Button>
            </div>
          </CardTitle>
          <CardDescription>
            useFetch and useAsyncData both return an error property when an error occurs.
            You can use this to check for errors and handle them accordingly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre class="block mb-4 whitespace-pre-wrap">{{ data ?? error }}</pre>
          <Tabs default-value="vue">
            <TabsList class="flex">
              <TabsTrigger value="code" class="w-full">Typescript</TabsTrigger>
              <TabsTrigger value="vue" class="w-full">Vue</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeBlock :code="typescriptCode" />
            </TabsContent>
            <TabsContent value="vue">
              <CodeBlock :code="vueCode" lang="vue" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </main>
</template>

<style scoped></style>
