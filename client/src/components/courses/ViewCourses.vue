<script setup>
import { ref, reactive, watch } from "vue";

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
  price: props.dataUser.price,
  start_date: props.dataUser.start_date,
  end_date: props.dataUser.end_date,
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
    <div type="button" @click="openModal" class="cursor-pointer">
      <i class="pi pi-eye" style="color: green"></i>
    </div>
    <Dialog
      v-model:visible="visible"
      header="View Courses"
      :style="{ width: '25rem' }"
      :closable="false"
      :draggable="false"
    >
      <form>
        <div class="flex items-center gap-4 mb-4">
          <label for="title" class="font-semibold w-24">Title</label>
          <InputText id="title" class="flex-auto" autocomplete="off" :value="form.title" disabled />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="description" class="font-semibold w-24">Description</label>
          <InputText id="description" class="flex-auto" autocomplete="off" :value="form.description" disabled />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="instructor" class="font-semibold w-24">Instructor</label>
          <InputText id="instructor" class="flex-auto" autocomplete="off" :value="form.instructor" disabled />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="duration" class="font-semibold w-24">Duration</label>
          <InputText
            id="duration"
            inputmode="numeric"
            class="flex-auto"
            autocomplete="off"
            :value="form.duration"
            disabled
          />
        </div>

        <div class="flex items-center gap-12 mb-4">
          <label class="font-semibold w-24">Level</label>
          <select class="select select-success w-full focus:outline-none" :value="form.level" id="level" disabled>
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
            disabled
          />
        </div>

        <div class="flex items-center gap-5 mb-4">
          <label for="start_date" class="font-semibold w-24">Active</label>
          <DatePicker v-model="form.start_date" showIcon id="start_date" dateFormat="dd/mm/yy" disabled />
        </div>

        <div class="flex items-center gap-5 mb-8">
          <label for="end_date" class="font-semibold w-24">Expired</label>
          <DatePicker v-model="form.end_date" showIcon id="end_date" dateFormat="dd/mm/yy" disabled />
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
