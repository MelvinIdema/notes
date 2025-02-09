<script lang="ts" setup>
import type { NavSection } from '~/composables/useNavigation'
import { repositoryCode, vueTemplate } from './exampleCode.js'
const { navMain } = useNavigation()
</script>

<template>
  <header>
    <h1 class="text-2xl font-bold">The Complete Guide to Data Fetching in Nuxt</h1>
    <p class="mt-1 text-sm text-muted-foreground">
      A reference work for the course 
      <NuxtLink to="https://vueschool.io/courses/the-complete-guide-to-data-fetching-in-nuxt" target="_blank" class="text-blue-500">The Complete Guide to Data Fetching in Nuxt.js</NuxtLink>
    </p>
  </header>
  <Separator class="my-4" />
  <main class="grid grid-cols-1 gap-6 md:grid-cols-[minmax(220px,min(35%,400px))_auto]">
    <Card>
      <CardHeader>
        <CardTitle>Table of Contents</CardTitle>
        <Separator class="mt-4" />
      </CardHeader>
      <CardContent>
        <ol class="grid gap-4">
          <li v-for="(section, sectionIndex) in navMain.filter((section: NavSection) => !section.hideInToC)" :key="section.title" class="mb-4">
            <div class="mb-3">
              <h3 class="text-lg font-semibold">
                {{ sectionIndex + 1 }}. {{ section.title }}
              </h3>
              <p v-if="section.description" class="text-sm text-muted-foreground">{{ section.description }}</p>
            </div>
            <ol class="ml-8 space-y-2">
              <li v-for="item in section.items" :key="item.title" class="list-decimal">
                <NuxtLink :to="item.url" class="text-blue-500 transition-colors hover:underline hover:text-blue-700">
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ol>
            <Separator class="mt-4" />
          </li>
        </ol>
      </CardContent>
    </Card>
    <Card class="overflow-hidden">
      <CardContent class="flex flex-col gap-4 pt-6">
        <CodeBlock :code="repositoryCode" lang="typescript" class="[data-state=open]:min-h-[219px]" />
        <CodeBlock :code="vueTemplate" lang="vue" class="max-h-[410px]" />
      </CardContent>
    </Card>
  </main>
</template>