<script setup>
import { ref, reactive, watch } from "vue";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Api from "../../utils";

import { useadminStore } from "../../utils/stores/admin/admin";

const store = useadminStore();

let visible = ref(false);
let isHidePassword = ref(true);

const props = defineProps({
  dataUser: Object,
});

const initialForm = reactive({
  name: props.dataUser.name,
  email: props.dataUser.email,
  password: "",
  role: props.dataUser.role,
});

const form = reactive({ ...initialForm });

const saveEditUser = async () => {
  try {
    const token = Cookies.get("token");

    let payload = {
      name: form.name,
      email: form.email,
      password: form.password ? form.password : props.dataUser.password,
      role: form.role,
    };

    const res = await Api.post(`admin/update/${props.dataUser.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    initialForm.name = form.name;
    initialForm.email = form.email;
    initialForm.password = form.password ? form.password : initialForm.password;
    initialForm.role = form.role;

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    closeModal();
    await store.dataListAdmin(true);
  } catch (error) {
    console.error(error);
    const errorData = error.response.data;

    if (error.response && error.response.data) {
      let errorMessage = "";

      switch (true) {
        case !!errorData.email:
          errorMessage += errorData.email.join(" ") + "\n";
          break;

        case !!errorData.name:
          errorMessage += errorData.name.join(" ") + "\n";
          break;

        case !!errorData.password:
          errorMessage += errorData.password.join(" ") + "\n";
          break;

        case !!errorData.role:
          errorMessage += errorData.role.join(" ") + "\n";
          break;

        case !!errorData.message:
          errorMessage += errorData.message + "\n";
          break;

        default:
          errorMessage = "Something went wrong!";
      }

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: errorMessage.trim(),
      });
    }
  }
};

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};

const openModal = () => {
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  form.name = initialForm.name;
  form.email = initialForm.email;
  form.password = "";
  form.role = initialForm.role;
};

watch(
  () => props.dataUser,
  (newData) => {
    if (newData) {
      initialForm.name = newData.name || "";
      initialForm.email = newData.email || "";
      initialForm.password = newData.password || "";
      initialForm.role = newData.role || "";
      resetForm();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="card flex justify-center">
    <div type="button" @click="openModal" class="cursor-pointer"><i class="pi pi-pencil" style="color: blue"></i></div>
    <Dialog
      v-model:visible="visible"
      header="Edit Users"
      :style="{ width: '25rem' }"
      :closable="false"
      :draggable="false"
    >
      <form @submit.prevent="saveEditUser">
        <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText id="name" class="flex-auto" autocomplete="off" v-model="form.name" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="form.email" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="password" class="font-semibold w-24">Password</label>
          <div class="relative flex-auto">
            <InputText
              id="password"
              :type="isHidePassword ? 'password' : 'text'"
              class="w-full"
              v-model="form.password"
            />
            <div
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              <span>
                <i class="pi pi-eye-slash" style="color: green" v-if="isHidePassword"></i>
                <i class="pi pi-eye" style="color: green" v-else></i>
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-12 mb-8">
          <label for="role" class="font-semibold w-24">Role</label>
          <select class="select select-success w-full focus:outline-none" v-model="form.role" id="role">
            <option value="administrator">Administrator</option>
            <option value="adminbranch">Admin Branch</option>
          </select>
        </div>

        <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="closeModal"></Button>
          <Button type="submit" label="Save" @click="visible = false"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped></style>
