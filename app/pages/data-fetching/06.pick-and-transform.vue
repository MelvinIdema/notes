<script setup>
/**
 * Pick is an option you can pass to useFetch
 * This allows you to pick the properties you want to receive and ignore the rest
 * 
 * Though the network request contains still all the properties.
 * Only the data object is minimized.
 */
const { data: singleUser } = await useLazyFetch('https://dummyjson.com/users/1', {
  pick: ['firstName', 'lastName'],
});

/**
 * Though "pick" only works on a single item.
 * You can use the transform() option to transform the data to your liking.
 */
const { data: allUsers } = await useLazyFetch('https://dummyjson.com/users', {
  transform(data) {
    return data.users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  },
});

const transformCode = `const { data: allUsers } = await useLazyFetch('https://dummyjson.com/users', {
  transform(data) {
    return data.users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  },
});`

const pickCode = `const { data: singleUser } = await useLazyFetch('https://dummyjson.com/users/1', {
  pick: ['firstName', 'lastName'],
});`

</script>

<template>
  <main>
    <div class="mx-auto max-w-5xl h-full">
      <div class="pb-4 mb-4 border-b border-border">
        <h1 class="mb-2 text-2xl font-bold">Transforming Payloads</h1>
        <p class="text-muted-foreground">
          useFetch and useAsyncData both have different options to transform or minimize the payload.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">Single User</CardTitle>
            <CardDescription>
              Pick is an option you can pass to useFetch to minimize the payload. <br><br>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="pickCode" lang="typescript" />
            <pre>{{ singleUser }}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="mb-2">All Users</CardTitle>
            <CardDescription>
              Though "pick" only works on a single item.
              You can use the transform() option to transform the data to your liking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock :code="transformCode" lang="typescript" />
            <ScrollArea class="h-[260px]">
              <div class="absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent pointer-events-none from-card" />
              <pre>{{ allUsers }}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>