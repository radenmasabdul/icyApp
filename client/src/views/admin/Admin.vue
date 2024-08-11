<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";
import AddNewAdmin from "../../components/admin/AddNewAdmin.vue";

import { ref, onBeforeMount, computed, watch } from "vue";
import { useadminStore } from "../../utils/stores/admin/admin";

import Api from "../../utils";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const store = useadminStore();
const dataListAdmin = computed(() => store.getDataAdmin);
const totalRecords = computed(() => store.getTotalRecords);

const columns = [
  { field: "no", header: "No" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
  { field: "role", header: "Role" },
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

const fetchData = async () => {
  await store.dataListAdmin(true);
};

const deleteUsers = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const token = Cookies.get("token");

      await Api.delete(`/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the user.",
        icon: "error",
      });
    }
  }
};
</script>

<template>
  <Layout>
    <div class="min-h-screen">
      <div class="grid grid-cols-1 min-h-full">
        <div class="flex flex-wrap justify-between mx-5 my-2">
          <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Users</h1>

          <AddNewAdmin @dataSaved="fetchData" />
        </div>

        <div class="flex flex-wrap mx-5 my-2">
          <InputText
            type="search"
            id="search"
            name="search"
            placeholder="Search..."
            class="w-full"
            v-model="searchQuery"
          />
        </div>

        <div class="mx-5 my-2">
          <Table>
            <DataTable :value="dataListAdmin" stripedRows>
              <Column
                sortable
                v-for="data in columns"
                :key="data.field"
                :field="data.field"
                :header="data.header"
              ></Column>

              <Column header="Actions">
                <template #body="slotProps">
                  <div class="flex space-x-2">
                    <button class="text-blue-500"><i class="fas fa-edit"></i> Edit</button>
                    <button @click="deleteUsers(slotProps.data.id)">
                      <i class="pi pi-trash" style="color: red"></i>
                    </button>
                  </div>
                </template>
              </Column>
            </DataTable>
          </Table>
        </div>

        <div class="flex flex-wrap justify-center py-4">
          <Paginator :rows="10" :totalRecords="totalRecords" :rowsPerPageOptions="[10, 25, 50, 75, 100]"></Paginator>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
