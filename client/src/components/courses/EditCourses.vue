<script setup>
import { ref, reactive, watch } from "vue";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import moment from "moment";
import Api from "../../utils";

import { usecoursesStore } from "../../utils/stores/courses/courses";

const store = usecoursesStore();

let visible = ref(false);

const props = defineProps({
  dataUser: Object,
});

const initialForm = reactive({
  title: props.dataUser.title,
  description: props.dataUser.description,
  instructor: props.dataUser.instructor,
  duration: props.dataUser.duration,
  level: props.dataUser.level,
  price: parseFloat(props.dataUser.price.replace(/[^\d.-]/g, "")),
  start_date: props.dataUser.start_date,
  end_date: props.dataUser.end_date,
});

const form = reactive({ ...initialForm });

const saveEditCourses = async () => {
  try {
    const token = Cookies.get("token");

    let payload = {
      title: form.title,
      description: form.description,
      instructor: form.instructor,
      duration: form.duration,
      level: form.level,
      price: form.price.toString(),
      start_date: form.start_date ? moment(form.start_date).format("YYYY-MM-DD") : "",
      end_date: form.end_date ? moment(form.end_date).format("YYYY-MM-DD") : "",
    };

    const res = await Api.post(`course/update/${props.dataUser.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    initialForm.title = form.title;
    initialForm.description = form.description;
    initialForm.instructor = form.instructor;
    initialForm.duration = form.duration;
    initialForm.level = form.level;
    initialForm.price = form.price;
    initialForm.start_date = form.start_date;
    initialForm.end_date = form.end_date;

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    closeModal();
    await store.dataListCourses(true);
  } catch (error) {
    console.error(error);
    const errorData = error.response.data;

    if (error.response && error.response.data) {
      let errorMessage = "";

      switch (true) {
        case !!errorData.title:
          errorMessage += errorData.title.join(" ") + "\n";
          break;

        case !!errorData.description:
          errorMessage += errorData.description.join(" ") + "\n";
          break;

        case !!errorData.instructor:
          errorMessage += errorData.instructor.join(" ") + "\n";
          break;

        case !!errorData.duration:
          errorMessage += errorData.duration.join(" ") + "\n";
          break;

        case !!errorData.level:
          errorMessage += errorData.level + "\n";
          break;

        case !!errorData.price:
          errorMessage += errorData.price + "\n";
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
  resetForm();
};

const resetForm = () => {
  form.title = initialForm.title;
  form.description = initialForm.description;
  form.instructor = initialForm.instructor;
  form.duration = initialForm.duration;
  form.level = initialForm.level;
  form.price = initialForm.price;
  form.start_date = initialForm.start_date;
  form.end_date = initialForm.end_date;
};

watch(
  () => props.dataUser,
  (newData) => {
    if (newData) {
      initialForm.title = newData.title || "";
      initialForm.description = newData.description || "";
      initialForm.instructor = newData.instructor || "";
      initialForm.duration = newData.duration || "";
      initialForm.level = newData.level || "";
      initialForm.price = newData.price || "";
      initialForm.start_date = newData.start_date || "";
      initialForm.end_date = newData.end_date || "";
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
      header="Edit Courses"
      :style="{ width: '25rem' }"
      :closable="false"
      :draggable="false"
    >
      <form @submit.prevent="saveEditCourses">
        <div class="flex items-center gap-4 mb-4">
          <label for="title" class="font-semibold w-24">Title</label>
          <InputText id="title" class="flex-auto" autocomplete="off" v-model="form.title" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="description" class="font-semibold w-24">Description</label>
          <InputText id="description" class="flex-auto" autocomplete="off" v-model="form.description" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="instructor" class="font-semibold w-24">Instructor</label>
          <InputText id="instructor" class="flex-auto" autocomplete="off" v-model="form.instructor" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="duration" class="font-semibold w-24">Duration</label>
          <InputText id="duration" inputmode="numeric" class="flex-auto" autocomplete="off" v-model="form.duration" />
        </div>

        <div class="flex items-center gap-12 mb-4">
          <label class="font-semibold w-24">Level</label>
          <select class="select select-success w-full focus:outline-none" v-model="form.level" id="level">
            <option value="Beginner">Beginner</option>
            <option value="Advance">Advance</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>

        <div class="flex items-center gap-12 mb-4">
          <label for="price" class="font-semibold w-24">Price</label>
          <InputNumber
            id="price"
            v-model="form.price"
            inputId="currency-id"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            fluid
          />
        </div>

        <div class="flex items-center gap-5 mb-4">
          <label for="start_date" class="font-semibold w-24">Active</label>
          <DatePicker v-model="form.start_date" showIcon id="start_date" dateFormat="dd/mm/yy" />
        </div>

        <div class="flex items-center gap-5 mb-8">
          <label for="end_date" class="font-semibold w-24">Expired</label>
          <DatePicker v-model="form.end_date" showIcon id="end_date" dateFormat="dd/mm/yy" />
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
