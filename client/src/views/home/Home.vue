<script setup>
import Layout from "../../layout/Layout.vue";
import StudentsCharts from "../../components/dashboard/StudentsCharts.vue";
</script>

<template>
  <Layout>
    <div class="py-2 px-2 min-h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-full">
        <StudentsCharts />
        <StudentsCharts />
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
