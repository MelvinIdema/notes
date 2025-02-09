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
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  :class="{ 'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground': dropdownOpen }"
                  @click="toggleDropdown"
                >
                  <div class="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                    <LucideGalleryVerticalEnd class="size-4" />
                  </div>
                  <div class="flex flex-col gap-0.5 leading-none">
                    <span class="font-semibold">Documentation</span>
                    <span>{{ selectedVersion }}</span>
                  </div>
                  <LucideChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                v-if="dropdownOpen"
                class="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                <DropdownMenuItem
                  v-for="version in data.versions"
                  :key="version"
                  @click="setSelectedVersion(version)"
                >
                  {{ version }}
                  <LucideCheck v-if="version === selectedVersion" class="ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

    <SidebarInset>
      <header class="flex gap-2 items-center px-4 h-16 border-b shrink-0">
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

      <div class="flex-1 p-6">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>