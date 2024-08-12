<script setup>
import { ref, reactive } from "vue";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Api from "../../utils";

let visible = ref(false);
let isHidePassword = ref(true);

const emit = defineEmits(["dataSaved"]);

const student = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  course: "",
  phone: "",
  gender: "",
});

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};

const validateForm = () => {
  if (
    !student.fullname ||
    !student.username ||
    !student.email ||
    !student.password ||
    !student.course ||
    !student.phone ||
    !student.gender
  ) {
    Swal.fire({
      icon: "error",
      title: "Validation Error!",
      text: "Please fill in all required fields.",
    });
    return false;
  }
  return true;
};

const addNew = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const token = Cookies.get("token");

    const payload = {
      fullname: student.fullname,
      username: student.username,
      email: student.email,
      password: student.password,
      course: student.course,
      phone: student.phone,
      gender: student.gender,
    };

    const res = await Api.post("/students/store", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emit("dataSaved");
    closeModal();
  } catch (error) {
    console.error(error);
    const errorData = error.response.data;

    if (error.response && error.response.data) {
      let errorMessage = "";

      switch (true) {
        case !!errorData.fullname:
          errorMessage += errorData.fullname.join(" ") + "\n";
          break;

        case !!errorData.name:
          errorMessage += errorData.name.join(" ") + "\n";
          break;

        case !!errorData.password:
          errorMessage += errorData.password.join(" ") + "\n";
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

const openModal = () => {
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  student.fullname = "";
  student.username = "";
  student.email = "";
  student.password = "";
  student.course = "";
  student.phone = "";
  student.gender = "";
};

const validatePhone = (event) => {
  const value = event.target.value;
  const cleanedValue = value.replace(/[^\d]/g, "");
  if (cleanedValue !== value) {
    event.target.value = cleanedValue;
  }
  student.phone = cleanedValue.slice(0, 15);
};
</script>

<template>
  <div class="card flex justify-center">
    <Button label="Add New" @click="openModal" />
    <Dialog v-model:visible="visible" header="Add New" :style="{ width: '25rem' }" :closable="false" :draggable="false">
      <form @submit.prevent="addNew">
        <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText id="name" class="flex-auto" autocomplete="off" v-model="student.fullname" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" v-model="student.username" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="student.email" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="password" class="font-semibold w-24">Password</label>
          <div class="relative flex-auto">
            <InputText
              id="password"
              :type="isHidePassword ? 'password' : 'text'"
              class="w-full"
              v-model="student.password"
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

        <div class="flex items-center gap-4 mb-4">
          <label for="course" class="font-semibold w-24">Course</label>
          <InputText id="course" class="flex-auto" autocomplete="off" v-model="student.course" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="phone" class="font-semibold w-24">Phone</label>
          <InputText
            id="phone"
            class="flex-auto"
            autocomplete="off"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="15"
            v-model="student.phone"
            @input="validatePhone"
          />
        </div>

        <div class="flex items-center gap-12 mb-8">
          <label for="gender" class="font-semibold w-24">Gender</label>
          <select class="select select-success w-full focus:outline-none" v-model="student.gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
