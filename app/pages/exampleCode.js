export const vueTemplate = `<script>
const userRepository = useUserRepository();

const { data: users, status } = useAsyncData('users', () => userRepository.index({ page: 1, perPage: 10 }));
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul v-if="status === 'success'">
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <div v-else-if="status === 'error'">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
`

export const repositoryCode = `function useUserRepository() {
  async function index(query) {
    return $fetch('/users', { query });
  }
  return { index }
}
`