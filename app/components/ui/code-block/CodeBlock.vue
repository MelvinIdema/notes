<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  lang?: string
  theme?: string
  class?: string
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  lang: 'typescript',
  theme: 'github-dark'
})

const isOpen = ref(true)
const highlightedCode = ref('')

highlightedCode.value = await codeToHtml(props.code, {
  lang: props.lang,
  theme: props.theme
})

const labelStyle = computed(() => {
  return {
    'typescript': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'javascript': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', 
    'vue': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    'css': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    'html': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    'json': 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    'markdown': 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
  }[props.lang] ?? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' // Fallback style
})
</script>

<template>
  <div :class="cn('overflow-hidden rounded-lg border border-border bg-gray-900/95', props.class)">
    <div class="flex justify-between items-center px-4 py-2 w-full border-b border-gray-700/90 bg-gray-800/90">
      <div class="flex gap-2 items-center">
        <div class="w-3 h-3 bg-red-400 rounded-full opacity-80" />
        <div class="w-3 h-3 bg-yellow-400 rounded-full opacity-80" />
        <div class="w-3 h-3 bg-green-400 rounded-full opacity-80" />
      </div>
      <div class="flex gap-2 items-center">
        <div :class="cn('px-2 py-1 text-xs font-medium text-gray-300 rounded-md bg-gray-700/80', labelStyle)">
          {{ props.lang }}
        </div>
      </div>
    </div>
    <div class="relative p-6 h-full text-sm">
      <div class="overflow-x-auto overflow-y-auto h-full" v-html="highlightedCode" />
    </div>
  </div>
</template>

<style scoped>
:deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  white-space: pre;
  max-width: 100%;
}

:deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: transparent !important;
  display: inline-block;
  max-width: 100%;
}
</style>
