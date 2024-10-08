<script setup>
import Layout from "../../layout/Layout.vue";
import Table from "../../components/Table.vue";
import AddNewStudents from "../../components/students/AddNewStudents.vue";
import EditStudents from "../../components/students/EditStudents.vue";
import ViewStudents from "../../components/students/ViewStudents.vue";

import { ref, onBeforeMount, computed } from "vue";
import { usestudentsStore } from "../../utils/stores/students/students";

import Api from "../../utils";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const store = usestudentsStore();
const dataListStudent = computed(() => store.getDataStudents);
const totalRecords = computed(() => store.getTotalRecords);
const perPage = computed(() => store.getPerPage);

const search = ref(store.search);
const gender = ref(store.gender);

const role = Cookies.get("role");

const columns = [
  { field: "no", header: "No" },
  { field: "fullname", header: "Name" },
  { field: "username", header: "Username" },
  { field: "email", header: "Email" },
  { field: "course", header: "Course" },
  { field: "phone", header: "Phone" },
  { field: "gender", header: "Gender" },
];

onBeforeMount(async () => {
  await store.dataListStudent(true);
});

const fetchData = async () => {
  await store.dataListStudent(true);
};

const deleteStudent = async (id) => {
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

      await Api.delete(`/students/delete/${id}`, {
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

const onPageChange = async (event) => {
  store.currentPage = event.page + 1;
  store.perPage = event.rows;
  await store.dataListStudent(true);
};

const handleSearch = () => {
  store.search = search.value;
  store.dataListStudent(true);
};

const handleFilterRole = () => {
  store.gender = gender.value;
  store.dataListStudent(true);
};

const resetData = () => {
  store.gender = "";
  store.dataListStudent(true);
};
</script>

<template>
  <Layout>
    <div class="min-h-screen">
      <div class="grid grid-cols-1 min-h-full">
        <div class="flex flex-wrap justify-between mx-5 my-2">
          <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Students</h1>

          <AddNewStudents @dataSaved="fetchData" v-if="role === 'administrator'" />
        </div>

        <div class="flex flex-wrap mx-5 my-2 gap-4">
          <select class="select select-success w-full max-w-xs focus:outline-none" v-model="gender" id="role">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <Button type="button" @click="handleFilterRole">
            <i class="pi pi-filter-fill" style="color: white"></i>
          </Button>

          <Button type="button" class="bg-red-500 border-red-500" @click="resetData">
            <i class="pi pi-refresh" style="color: white"></i>
          </Button>
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
            <DataTable :value="dataListStudent" stripedRows v-if="dataListStudent.length > 0">
              <Column
                sortable
                v-for="data in columns"
                :key="data.field"
                :field="data.field"
                :header="data.header"
              ></Column>

              <Column header="Actions">
                <template #body="slotProps">
                  <div class="flex justify-center items-center gap-4">
                    <div class="flex gap-4" v-if="role === 'administrator'">
                      <EditStudents :dataUser="slotProps.data" />
                      <button @click="deleteStudent(slotProps.data.id)">
                        <i class="pi pi-trash" style="color: red"></i>
                      </button>
                    </div>
                    <ViewStudents :dataUser="slotProps.data" />
                  </div>
                </template>
              </Column>
            </DataTable>

            <DataTable :value="dataListStudent" stripedRows v-else>
              <Column
                sortable
                v-for="data in columns"
                :key="data.field"
                :field="data.field"
                :header="data.header"
              ></Column>

              <ColumnGroup type="footer">
                <Row>
                  <Column footer="Data Not Found" :colspan="7" class="text-center font-JakartaSans" />
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
