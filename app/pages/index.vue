<script lang="ts" setup>
const { navMain } = useNavigation()
</script>

<template>
  <header>
    <h1 class="text-2xl font-bold">The Complete Guide to Data Fetching in Nuxt</h1>
    <p class="mt-1 text-sm text-muted-foreground">
      A reference work for the course <NuxtLink to="https://vueschool.io/courses/the-complete-guide-to-data-fetching-in-nuxt" target="_blank" class="text-blue-500">The Complete Guide to Data Fetching in Nuxt.js</NuxtLink>
    </p>
  </header>
  <Separator class="my-4" />
  <main>
    <h2 class="text-xl font-semibold">Table of Contents</h2>
    <Separator class="my-4" />
    <ol class="grid gap-4">
      <li v-for="(section, sectionIndex) in navMain" :key="section.title" class="mb-4">
        <div class="mb-3">
          <h3 class="text-lg font-semibold">{{ sectionIndex + 1 }}. {{ section.title }}</h3>
          <p v-if="section.description" class="text-sm text-muted-foreground">{{ section.description }}</p>
        </div>
        <ol class="ml-8 space-y-2">
          <li v-for="(item, itemIndex) in section.items" :key="item.title" class="list-decimal">
            <NuxtLink :to="item.url" class="text-blue-500 transition-colors hover:underline hover:text-blue-700">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ol>
      </li>
    </ol>
  </main>
</template>