<script lang="ts" setup>
const error = useError()
</script>

<template>
  <NuxtLayout>
      <Card class="mx-auto mt-36 w-full max-w-xl">
        <CardHeader class="text-center">
          <CardTitle class="text-4xl font-bold">Error {{ error?.statusCode }}</CardTitle>
          <CardDescription>{{ error?.statusMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="flex gap-4 justify-center">
          <Button @click="navigateTo('/')">Go to Home</Button>
          <Button @click="navigateTo('/data-fetching/03.error')">Or go (back) to Error Page</Button>
        </CardContent>
      </Card>
  </NuxtLayout>
</template>