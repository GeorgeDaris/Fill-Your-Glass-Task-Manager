<script setup>
import { ref, inject } from "vue";
const emit = defineEmits(["filter"]);

let option = ref("Most recent");
let categories = inject("categories");

//setting the initial value
let selectedCategory = ref(categories[0].title);

const sendFilter = () => {
  //emitting the filter option to the parent: ArchiveEntry
  if (option.value === "Category") {
    //sending the category when specified
    emit("filter", option.value, selectedCategory.value);
  } else {
    emit("filter", option.value);
  }
};
</script>

<template>
  <form
    @submit.prevent
    class="md:mt-8 ml-4 md:ml-40 px-2 flex flex-col md:items-center md:flex-row gap-2 md:gap-6"
  >
    <label for="filterOption">Filter by </label>
    <select
      v-model="option"
      @change="sendFilter()"
      name="filterOption"
      id="filterOption"
      class="bg-bgColor text-text mr-4 md:max-w-[8rem] p-2 border-2 border-accentColor rounded-md cursor-pointer dark:bg-darkBg dark:text-darkText"
    >
      <option value="Most recent">Most recent</option>
      <option value="Oldest">Oldest</option>
      <option value="Category">Category</option>
    </select>

    <!-- Displaying options once the user has chosen to filter by categories -->
    <template v-if="option === 'Category'">
      <label for="categoryOption">{{ option }} </label>
      <select
        v-model="selectedCategory"
        @change="sendFilter()"
        name="categoryOption"
        id="categoryOption"
        class="bg-bgColor text-text mr-4 md:max-w-[8rem] p-2 border-2 border-accentColor rounded-md cursor-pointer dark:bg-darkBg dark:text-darkText"
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
