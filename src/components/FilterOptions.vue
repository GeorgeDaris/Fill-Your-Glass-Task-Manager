<script setup>
import { ref, inject } from "vue";
const emit = defineEmits(["filter"]);

let option = ref("Most recent");
let categories = inject("categories");

//setting the initial value
let selectedCategory = ref(categories[0].title);

const sendFilter = () => {
  //emitting the filter option to the paretn: ArchiveEntry
  emit("filter", option.value);
};
</script>

<template>
  <form @submit.prevent class="mt-4 ml-8 flex items-center gap-6">
    <label for="">Filter by </label>
    <select
      v-model="option"
      @change="sendFilter()"
      name=""
      id=""
      class="bg-bgColor text-text max-w-[8rem] p-2 border-2 border-accentColor rounded-md cursor-pointer dark:bg-darkBg dark:text-darkText"
    >
      <option value="Most recent">Most recent</option>
      <option value="Oldest">Oldest</option>
      <option value="Category">Category</option>
    </select>

    <!-- Displaying options once the user has chosen to filter by categories -->
    <template v-if="option === 'Category'">
      <label for="">{{ option }} </label>
      <select
        v-model="selectedCategory"
        name=""
        id=""
        class="bg-bgColor text-text max-w-[8rem] p-2 border-2 border-accentColor rounded-md cursor-pointer dark:bg-darkBg dark:text-darkText"
      >
        <option
          v-for="category in categories"
          :value="category.title"
          :key="category.id"
        >
          {{ category.title }}
        </option>
      </select>
    </template>
  </form>
</template>
