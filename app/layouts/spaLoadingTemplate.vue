<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <!-- Version selector skeleton -->
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div class="flex justify-center items-center rounded-lg aspect-square size-8">
                <Skeleton class="w-full h-full" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <Skeleton class="w-[100px] h-[16px]" />
                <Skeleton class="w-[60px] h-[14px]" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <!-- Search bar skeleton -->
        <SidebarGroup class="py-0">
          <SidebarGroupContent class="relative">
            <Skeleton class="w-full h-[36px] rounded-md" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <!-- Navigation menu skeletons -->
        <SidebarGroup v-for="i in 2" :key="i">
          <SidebarGroupLabel>
            <Skeleton class="w-[120px] h-[16px]" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="j in (i === 1 ? 1 : 8)" :key="j">
                <Skeleton class="w-full h-[32px] rounded-md my-1" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <!-- Header with breadcrumb skeleton -->
      <header class="flex gap-2 items-center px-4 h-16 border-b shrink-0">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <div class="flex gap-2 items-center">
          <Skeleton class="w-[80px] h-[16px]" />
          <span class="opacity-40">/</span>
          <Skeleton class="w-[100px] h-[16px]" />
        </div>
      </header>

      <!-- Main content loading indicator -->
      <div class="flex-1 p-6">
        <div class="flex justify-center items-center h-full">
          <p class="text-xl text-muted-foreground">Loading...</p>
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
// No props or logic needed for the loading template
</script>