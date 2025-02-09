<script lang="ts" setup>
import { exampleCode } from './exampleCode.js'

const code = `export default async function useInitializeNuxtApp() {
    const { status, execute } = await useLazyAsyncData('authentication', async () => {
      // An api call that takes some time
      const importantData = await $fetch('/api/1000')
      
      // An api call that takes some time
      const unimportantData = await Promise.all([
        $fetch('/api/1000'),
        $fetch('/api/1000'),
        $fetch('/api/1000'),
        $fetch('/api/1000'),
      ])

      return { importantData, unimportantData }
      
      // Make sure it's not executed immediately so we can execute it ourselves.
      }, { immediate: false })

    return {
        initializationStatus: status,
        initializeNuxtApp: execute
    }
}`

const usageCode = `const { initializationStatus, initializeNuxtApp } = await useInitializeNuxtApp()

onMounted(async () => {
  await initializeNuxtApp()
})`
</script>

<template>
  <main>
    <div class="mx-auto space-y-4 max-w-5xl h-full">
        <!-- Header -->
        <div class="pb-4 border-b border-border">
          <h1 class="mb-2 text-2xl font-bold">App Initialization</h1>
          <p class="text-muted-foreground">The "proper" way to initialize a Nuxt app.</p>
        </div>

        <!-- Content -->
        <Card>
          <CardHeader>
            <CardTitle>Create an initialization composable</CardTitle>
            <CardDescription>
              You can use the Nuxt fetch composables inside your own composables.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="code" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use the initialization composable in your app</CardTitle>
            <CardDescription>
              You can use the initialization composable in your app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="usageCode" />
          </CardContent>
        </Card>

        <!-- Example using composable in app.vue with layout -->
        <Card>
          <CardHeader>
            <CardTitle>Example using composable in app.vue with layout</CardTitle>
            <CardDescription>
              This is an example of how to use the initialization composable in app.vue with a layout.
              <br>
              <br>
              <Alert variant="info">
                <LucideAlertCircle class="w-4 h-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  This implementation does not take into account an authentication flow
                  where you might not want to to initialize the app until the user is authenticated.
                </AlertDescription>
              </Alert>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="exampleCode" lang="vue" />
          </CardContent>
        </Card>
      </div>
  </main>
</template>