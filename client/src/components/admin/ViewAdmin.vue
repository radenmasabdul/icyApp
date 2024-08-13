<script setup>
import { ref, reactive, watch } from "vue";

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
    <div type="button" @click="openModal" class="cursor-pointer">
      <i class="pi pi-eye" style="color: green"></i>
    </div>
    <Dialog
      v-model:visible="visible"
      header="View Users"
      :style="{ width: '25rem' }"
      :closable="false"
      :draggable="false"
    >
      <form>
        <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText id="name" class="flex-auto" autocomplete="off" :value="form.name" disabled />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" :value="form.email" disabled />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="password" class="font-semibold w-24">Password</label>
          <div class="relative flex-auto">
            <InputText
              id="password"
              :type="isHidePassword ? 'password' : 'text'"
              class="w-full"
              :value="form.password"
              disabled
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
          <select class="select select-success w-full focus:outline-none" :value="form.role" id="role" disabled>
            <option value="administrator">Administrator</option>
            <option value="adminbranch">Admin Branch</option>
          </select>
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Close"
            severity="secondary"
            @click="closeModal"
            class="bg-red-500 text-white"
          ></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped></style>
