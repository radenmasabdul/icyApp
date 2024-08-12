<script setup>
import { ref, reactive } from "vue";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import moment from "moment";
import Api from "../../utils";

let visible = ref(false);

const emit = defineEmits(["dataSaved"]);

const course = reactive({
  title: "",
  description: "",
  instructor: "",
  duration: "",
  level: "",
  price: 0,
  start_date: "",
  end_date: "",
});

const validateForm = () => {
  if (
    !course.title ||
    !course.description ||
    !course.instructor ||
    !course.duration ||
    !course.level ||
    !course.price ||
    !course.start_date ||
    !course.end_date
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
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: parseInt(course.duration),
      level: course.level,
      price: course.price.toString().replace(/\./g, ""),
      start_date: course.start_date ? moment(course.start_date).format("YYYY-MM-DD") : "",
      end_date: course.end_date ? moment(course.end_date).format("YYYY-MM-DD") : "",
    };

    const res = await Api.post("/course/store", payload, {
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
          errorMessage += errorData.duration + "\n";
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
  course.title = "";
  course.description = "";
  course.instructor = "";
  course.duration = "";
  course.level = "";
  course.price = 0;
  course.start_date = "";
  course.end_date = "";
};
</script>

<template>
  <div class="card flex justify-center">
    <Button label="Add New" @click="openModal" />
    <Dialog v-model:visible="visible" header="Add New" :style="{ width: '25rem' }" :closable="false" :draggable="false">
      <form @submit.prevent="addNew">
        <div class="flex items-center gap-4 mb-4">
          <label for="title" class="font-semibold w-24">Title</label>
          <InputText id="title" class="flex-auto" autocomplete="off" v-model="course.title" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="description" class="font-semibold w-24">Description</label>
          <InputText id="description" class="flex-auto" autocomplete="off" v-model="course.description" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="instructor" class="font-semibold w-24">Instructor</label>
          <InputText id="instructor" class="flex-auto" autocomplete="off" v-model="course.instructor" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="duration" class="font-semibold w-24">Duration</label>
          <InputText id="duration" inputmode="numeric" class="flex-auto" autocomplete="off" v-model="course.duration" />
        </div>

        <div class="flex items-center gap-12 mb-4">
          <label for="level" class="font-semibold w-24">Level</label>
          <select class="select select-success w-full focus:outline-none" v-model="course.level" id="level">
            <option value="Beginner">Beginner</option>
            <option value="Advance">Advance</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>

        <div class="flex items-center gap-12 mb-4">
          <label for="price" class="font-semibold w-24">Price</label>
          <InputNumber
            id="price"
            v-model="course.price"
            inputId="currency-id"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            fluid
          />
        </div>

        <div class="flex items-center gap-5 mb-4">
          <label for="start_date" class="font-semibold w-24">Active</label>
          <DatePicker v-model="course.start_date" showIcon id="start_date" dateFormat="dd/mm/yy" />
        </div>

        <div class="flex items-center gap-5 mb-8">
          <label for="end_date" class="font-semibold w-24">Expired</label>
          <DatePicker v-model="course.end_date" showIcon id="end_date" dateFormat="dd/mm/yy" />
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
