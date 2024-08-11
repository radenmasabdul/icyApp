<script setup>
import Logo from "../../assets/logo.jpg";

import { ref, onBeforeMount } from "vue";

import Cookies from "js-cookie";
import Api from "../../utils/index.js";

let userData = ref([]);
let name = ref("");

const visible = ref(false);

const getUserLogin = async () => {
  try {
    const token = Cookies.get("token");

    const res = await Api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userData.value = res.data;
    name.value = res.data.name;
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  await getUserLogin();
});
</script>

<template>
  <div class="card flex justify-start py-4">
    <Drawer v-model:visible="visible">
      <template #container>
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <img :src="Logo" alt="logo" class="h-20 w-auto rounded-full" />
              <span class="font-semibold text-2xl text-black">Icy Company</span>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-4 m-0">
              <li>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <router-link
                      to="/dashboard"
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium font-JakartaSans">Dashboard</span>
                    </router-link>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-user mr-2"></i>
                      <span class="font-medium font-JakartaSans">Users</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-users mr-2"></i>
                      <span class="font-medium font-JakartaSans">Students</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-slideup',
                      }"
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium font-JakartaSans">Reports</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                    >
                      <li>
                        <a
                          v-ripple
                          v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup',
                          }"
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium font-JakartaSans">Revenue</span>
                          <i class="pi pi-chevron-down ml-auto"></i>
                        </a>
                        <ul
                          class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                        >
                          <li>
                            <a
                              v-ripple
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-table mr-2"></i>
                              <span class="font-medium font-JakartaSans">View</span>
                            </a>
                          </li>
                          <li>
                            <a
                              v-ripple
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-search mr-2"></i>
                              <span class="font-medium font-JakartaSans">Search</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a
                          v-ripple
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium font-JakartaSans">Expenses</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-bell mr-2"></i>
                      <span class="font-medium font-JakartaSans">Notification</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium font-JakartaSans">Messages</span>
                      <span
                        class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
                        style="min-width: 1.5rem; height: 1.5rem"
                        >3</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-calendar mr-2"></i>
                      <span class="font-medium font-JakartaSans">Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-cog mr-2"></i>
                      <span class="font-medium font-JakartaSans">Settings</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
            <a
              v-ripple
              class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
            >
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold font-JakartaSans">{{ name }}</span>
            </a>
          </div>
        </div>
      </template>
    </Drawer>
    <Button icon="pi pi-bars" @click="visible = true" />
  </div>
</template>

<style scoped></style>
