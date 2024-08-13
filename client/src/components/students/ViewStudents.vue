<script setup>
import { ref, reactive, watch } from "vue";

// import Swal from "sweetalert2";
// import Cookies from "js-cookie";
// import Api from "../../utils";

// import { usestudentsStore } from "../../utils/stores/students/students";

// const store = usestudentsStore();

let visible = ref(false);
let isHidePassword = ref(true);

const props = defineProps({
  dataUser: Object,
});

const initialForm = reactive({
  fullname: props.dataUser.fullname,
  username: props.dataUser.username,
  email: props.dataUser.email,
  password: "",
  course: props.dataUser.course,
  phone: props.dataUser.phone,
  gender: props.dataUser.gender,
});

const form = reactive({ ...initialForm });

// const saveEditUser = async () => {
//   try {
//     const token = Cookies.get("token");

//     let payload = {
//       fullname: form.fullname,
//       username: form.username,
//       email: form.email,
//       password: form.password ? form.password : props.dataUser.password,
//       course: form.course,
//       phone: form.phone,
//       gender: form.gender,
//     };

//     const res = await Api.post(`students/update/${props.dataUser.id}`, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     initialForm.fullname = form.fullname;
//     initialForm.username = form.username;
//     initialForm.email = form.email;
//     initialForm.password = form.password ? form.password : initialForm.password;
//     initialForm.course = form.course;
//     initialForm.phone = form.phone;
//     initialForm.gender = form.gender;

//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Your work has been saved",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     closeModal();
//     await store.dataListStudent(true);
//   } catch (error) {
//     console.error(error);
//     const errorData = error.response.data;

//     if (error.response && error.response.data) {
//       let errorMessage = "";

//       switch (true) {
//         case !!errorData.fullname:
//           errorMessage += errorData.email.join(" ") + "\n";
//           break;

//         case !!errorData.username:
//           errorMessage += errorData.name.join(" ") + "\n";
//           break;

//         case !!errorData.email:
//           errorMessage += errorData.password.join(" ") + "\n";
//           break;

//         case !!errorData.password:
//           errorMessage += errorData.role.join(" ") + "\n";
//           break;

//         case !!errorData.message:
//           errorMessage += errorData.message + "\n";
//           break;

//         default:
//           errorMessage = "Something went wrong!";
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Failed!",
//         text: errorMessage.trim(),
//       });
//     }
//   }
// };

// const togglePasswordVisibility = () => {
//   isHidePassword.value = !isHidePassword.value;
// };

const openModal = () => {
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  form.fullname = initialForm.fullname;
  form.username = initialForm.username;
  form.email = initialForm.email;
  form.password = initialForm.password;
  form.course = initialForm.course;
  form.phone = initialForm.phone;
  form.gender = initialForm.gender;
};

// const validatePhone = (event) => {
//   const value = event.target.value;
//   const cleanedValue = value.replace(/[^\d]/g, "");
//   if (cleanedValue !== value) {
//     event.target.value = cleanedValue;
//   }
//   form.phone = cleanedValue.slice(0, 15);
// };

watch(
  () => props.dataUser,
  (newData) => {
    if (newData) {
      initialForm.fullname = newData.fullname || "";
      initialForm.username = newData.username || "";
      initialForm.email = newData.email || "";
      initialForm.password = newData.password || "";
      initialForm.course = newData.course || "";
      initialForm.phone = newData.phone || "";
      initialForm.gender = newData.gender || "";
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
      header="View Students"
      :style="{ width: '25rem' }"
      :closable="false"
      :draggable="false"
    >
      <form>
        <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText id="name" class="flex-auto" autocomplete="off" :value="form.fullname" disabled />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" :value="form.username" disabled />
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

        <div class="flex items-center gap-4 mb-4">
          <label for="course" class="font-semibold w-24">Course</label>
          <InputText id="course" class="flex-auto" autocomplete="off" :value="form.course" disabled />
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
            :value="form.phone"
            disabled
          />
        </div>

        <div class="flex items-center gap-12 mb-8">
          <label for="gender" class="font-semibold w-24">Gender</label>
          <select class="select select-success w-full focus:outline-none" :value="form.gender" id="gender" disabled>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
