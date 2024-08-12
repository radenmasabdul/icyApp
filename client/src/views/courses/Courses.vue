<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";
import AddNewCourses from "../../components/courses/AddNewCourses.vue";
import EditCourses from "../../components/courses/EditCourses.vue";

import { ref, onBeforeMount, computed } from "vue";
import { usecoursesStore } from "../../utils/stores/courses/courses";

import Api from "../../utils";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import moment from "moment";

const store = usecoursesStore();
const dataListCourses = computed(() => store.getDataCourses);
const totalRecords = computed(() => store.getTotalRecords);
const perPage = computed(() => store.getPerPage);

const search = ref(store.search);

const columns = [
  { field: "no", header: "No" },
  { field: "title", header: "Title" },
  { field: "instructor", header: "Instructor" },
  { field: "description", header: "Description" },
  { field: "level", header: "Level" },
];

onBeforeMount(async () => {
  await store.dataListCourses(true);
});

const fetchData = async () => {
  await store.dataListCourses(true);
};

const deleteCourses = async (id) => {
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

      await Api.delete(`/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Deleted!",
        text: "Courses has been deleted.",
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

const onPageChange = async (event) => {
  store.currentPage = event.page + 1;
  store.perPage = event.rows;
  await store.dataListCourses(true);
};

const handleSearch = () => {
  store.search = search.value;
  store.dataListCourses(true);
};

const formatDays = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const formatCurrency = (value) => {
  if (value) {
    return parseFloat(value).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }
  return "Rp0";
};
</script>

<template>
  <Layout>
    <div class="min-h-screen">
      <div class="grid grid-cols-1 min-h-full">
        <div class="flex flex-wrap justify-between mx-5 my-2">
          <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Courses</h1>

          <AddNewCourses @dataSaved="fetchData" />
        </div>

        <div class="flex flex-wrap mx-5 my-2">
          <InputText
            type="search"
            id="search"
            name="search"
            placeholder="Search..."
            class="w-full"
            v-model="search"
            @input="handleSearch"
          />
        </div>

        <div class="mx-5 my-2">
          <Table>
            <DataTable :value="dataListCourses" stripedRows v-if="dataListCourses.length > 0">
              <Column
                sortable
                v-for="data in columns"
                :key="data.field"
                :field="data.field"
                :header="data.header"
              ></Column>

              <Column field="price" header="Price" sortable>
                <template #body="slotProps"> {{ formatCurrency(slotProps.data.price) }}</template>
              </Column>

              <Column field="duration" header="Duration" sortable>
                <template #body="slotProps"> {{ slotProps.data.duration }}</template>
              </Column>

              <Column field="start_date" header="Active" sortable>
                <template #body="slotProps">
                  {{ formatDays(slotProps.data.start_date) }}
                </template>
              </Column>

              <Column field="end_date" header="Expired" sortable>
                <template #body="slotProps">
                  {{ formatDays(slotProps.data.end_date) }}
                </template>
              </Column>

              <Column header="Actions">
                <template #body="slotProps">
                  <div class="flex gap-4">
                    <EditCourses :dataUser="slotProps.data" />
                    <button @click="deleteCourses(slotProps.data.id)">
                      <i class="pi pi-trash" style="color: red"></i>
                    </button>
                  </div>
                </template>
              </Column>
            </DataTable>

            <DataTable :value="dataListCourses" stripedRows v-else>
              <Column
                sortable
                v-for="data in columns"
                :key="data.field"
                :field="data.field"
                :header="data.header"
              ></Column>

              <ColumnGroup type="footer">
                <Row>
                  <Column footer="Data Not Found" :colspan="5" class="text-center font-JakartaSans" />
                </Row>
              </ColumnGroup>
            </DataTable>
          </Table>
        </div>

        <div class="flex flex-wrap justify-center py-4">
          <Paginator
            :rows="perPage"
            :totalRecords="totalRecords"
            :rowsPerPageOptions="[10, 25, 50, 75, 100]"
            @page="onPageChange"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
