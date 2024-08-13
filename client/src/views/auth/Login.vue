<script setup>
import Logo from "../../assets/logo.jpg";
import Wallpapers from "../../assets/wp.jpg";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Api from "../../utils/index.js";

import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

let isHidePassword = ref(true);
let isLoading = ref(false);

const login = async () => {
  isLoading.value = true;

  try {
    const res = await Api.post("/login", {
      email: user.email,
      password: user.password,
    });

    Cookies.set("token", res.data.token, { expires: 0.5 }); // Set token to expire in 12 hours
    Cookies.set("user", JSON.stringify(res.data.user), { expires: 0.5 }); // Set user data to expire in 12 hours
    Cookies.set("role", res.data.user.role, { expires: 0.5 });

    if (Cookies.get("token")) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        html: "Redirecting in <b></b> seconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          let countDown = 2;
          timer.textContent = countDown.toString();
          const timerInterval = setInterval(() => {
            countDown--;
            timer.textContent = countDown.toString();
            if (countDown <= 0) {
              clearInterval(timerInterval);
            }
          }, 1000);
        },
        willClose: () => {
          router.push({ name: "dashboard" });
        },
      });
    }
  } catch (error) {
    console.error(error);
    const errorData = error.response.data;

    if (error.response && error.response.data) {
      let errorMessage = "";

      switch (true) {
        case !!errorData.email:
          errorMessage += errorData.email.join(" ") + "\n";
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
        title: "Login Failed",
        text: errorMessage.trim(),
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};
</script>

<template>
  <main
    class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8"
    :style="{ backgroundImage: `url(${Wallpapers})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <Card class="sm:mx-auto sm:w-full sm:max-w-md">
      <template #title>
        <div>
          <img class="mx-auto h-20 w-auto rounded-full" :src="Logo" alt="logo" />
          <p
            class="py-2 font-DancingSans text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
          >
            Icy Company
          </p>
        </div>
        <h2
          class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-JakartaSans dark:text-white"
        >
          Sign in to your account
        </h2>
      </template>

      <template #content class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-3" @submit.prevent="login">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-JakartaSans">Email<span class="text-red-600">*</span></label>
            <InputText id="email" autocomplete="on" v-model="user.email" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="font-JakartaSans">Password<span class="text-red-600">*</span></label>
            <div class="relative">
              <InputText
                id="password"
                :type="isHidePassword ? 'password' : 'text'"
                class="w-full"
                v-model="user.password"
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

          <div>
            <Button type="submit" label="Sign In" severity="success" class="w-full" />
          </div>

          <div>
            <RouterLink to="/forgot">
              <p
                class="text-sm font-medium font-JakartaSans leading-6 text-indigo-600 hover:text-indigo-500 dark:text-white"
              >
                Forgot your password?
              </p>
            </RouterLink>
          </div>
        </form>
      </template>

      <template #footer>
        <Divider type="solid" />
        <RouterLink to="/register">
          <Button label="Register" severity="info" class="w-full" />
        </RouterLink>
      </template>
    </Card>
  </main>
</template>

<style scoped></style>
