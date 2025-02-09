<script setup lang="ts">
const data = {
  versions: ['Data Fetching'],
}

const { navMain } = useNavigation()

const selectedVersion = ref(data.versions[0])
const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function setSelectedVersion(version: string) {
  selectedVersion.value = version
}

const currentRoute = computed(() => useRoute().path)
const isActive = (url: string) => currentRoute.value === url

const breadcrumb = computed(() => {
  const path = useRoute().path
  const crumbs = path.split('/').filter(Boolean)
  return crumbs.map(crumb => crumb.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()))
})
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div class="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                <LucideGalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Documentation</span>
                <span>{{ selectedVersion }}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup v-for="item in navMain" :key="item.title">
          <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuButton class="transition-colors hover:bg-gray-100" :class="{ 'bg-blue-600 text-white hover:bg-blue-700': isActive(subItem.url) }" as-child>
                  <NuxtLink :to="subItem.url">{{ subItem.title }}</NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>

    <SidebarInset class="flex overflow-hidden flex-col flex-1 bg-gray-50 h-svh">
      <header class="flex gap-2 items-center px-4 h-16 bg-white border-b shrink-0">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <template  v-for="(crumb, index) in breadcrumb" :key="crumb">
                <BreadcrumbItem class="hidden md:block">{{ crumb }}</BreadcrumbItem>
                <BreadcrumbSeparator v-if="index !== breadcrumb.length - 1" class="hidden md:block" />
              </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div class="overflow-y-auto overflow-x-hidden flex-1 p-6 min-h-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>