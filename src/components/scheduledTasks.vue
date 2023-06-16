<script setup>
import { inject } from "vue";

const props = defineProps(["todos", "date"]);
const emit = defineEmits(["change-date"]);

const changeDate = () => {
  emit("change-date", props.date);
};

const categories = inject("categories");

const categoryColor = (todo) => {
  let categoryColor = "";
  categories.forEach((category) => {
    if (todo.category == category.title) {
      categoryColor = category.color;
    }
  });
  return categoryColor;
};
</script>

<template>
  <ul class="max-h-8 max-w-[5rem]">
    <template v-for="todo in props.todos" :key="todo.id">
      <li
        v-if="todo.date == String(props.date).padStart(2, '0')"
        class="text-xs truncated-text relative mt-[0.1rem]"
        :style="`background: linear-gradient(to bottom, transparent 60%, ${categoryColor(
          todo
        )} 40%);`"
      >
        <span
          class="drop-shadow-[0.06rem_0.05rem_var(--bg),_0.08rem_0.07rem_var(--bg)] thick-text-shadow"
        >
          {{ todo.title }}
        </span>
      </li>
    </template>
  </ul>
  <button
    @click="changeDate"
    class="w-[90%] h-[80%] p-2 absolute top-1"
    :title="`View tasks for ${props.date}`"
  ></button>
</template>

<style scoped>
.truncated-text::after {
  content: "";
  display: block;
  height: 0.99rem;
  width: 60%;
  background: linear-gradient(to right, transparent, var(--bg) 80%);
  position: absolute;
  right: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  /* z-index: -1; */
  /* box-shadow: 0.1rem 0rem 2rem 0rem inset red; */
}
</style>
