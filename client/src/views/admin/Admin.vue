<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";

import { ref, onBeforeMount, computed, watch } from "vue";
import { useadminStore } from "../../utils/stores/admin/admin";

const store = useadminStore();
const dataListAdmin = computed(() => store.getDataAdmin);
const totalRecords = computed(() => store.getTotalRecords);

const columns = [
  { field: "no", header: "No" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
  { field: "role", header: "Role" },
  { field: "actions", header: "Actions" },
];

const searchQuery = ref("");
const currentPage = ref(1);
const rowsPerPage = ref(10);

onBeforeMount(async () => {
  await store.dataListAdmin();
});

watch(searchQuery, (newQuery) => {
  store.setSearchQuery(newQuery);
});

watch(currentPage, (newPage) => {
  store.setCurrentPage(newPage);
});

watch(rowsPerPage, (newPerPage) => {
  store.setPerPage(newPerPage);
});

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const handleRowsPerPageChange = (event) => {
  rowsPerPage.value = event.value;
  store.setPerPage(rowsPerPage.value);
};
</script>

<template>
  <Layout>
    <!-- <div class="min-h-screen"> -->
    <div class="flex flex-wrap justify-between mx-5 my-2">
      <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Users</h1>

      <!-- <AddAdmin /> -->
    </div>

    <div class="flex flex-wrap mx-5 my-2">
      <InputText type="search" id="search" name="search" placeholder="Search..." class="w-full" v-model="searchQuery" />
    </div>

    <div class="mx-5 my-2">
      <Table>
        <DataTable
          stripedRows
          :value="dataListAdmin"
          paginator
          :rows="rowsPerPage"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="[10, 25, 50, 75, 100]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          @pageChange="handlePageChange"
          @rowsPerPageChange="handleRowsPerPageChange"
        >
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>
          <Column v-for="data in columns" :key="data.field" :field="data.field" :header="data.header"></Column>
        </DataTable>
      </Table>
    </div>
    <!-- </div> -->
  </Layout>
</template>

<style scoped></style>
