<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import Content from "../components/layout/Content.vue";
</script>

<template>
  <main class="flex h-full">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Navbar />

      <div class="h-full bg-base-200">
        <Content>
          <slot></slot>
        </Content>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
