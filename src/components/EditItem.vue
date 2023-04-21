<script setup>
import { ref, onMounted, inject } from "vue";

const props = defineProps(["todo", "show"]);
const emit = defineEmits(["edited"]);
const updateTodo = inject("updateTodo");

let editing = ref(true);
let input = ref(null);

let newTitle = ref(props.todo.title);

async function editLabel() {
  editing.value = false;
  emit("edited");
  updateTodo(props.todo.id, newTitle.value);
}

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <form @submit.prevent="editLabel" class="z-40 mt-1" v-if="editing">
    <input
      type="text"
      v-model.trim.lazy="newTitle"
      class="bg-bgColor border-b-2 block max-w-[7rem] resize-none focus:outline-none focus:border-b-accentColor dark:bg-darkBg"
      ref="input"
    />
    <!-- <button @click.prevent="editLabel">Save</button> -->
  </form>
</template>

<style>
form {
  display: inline;
}
</style>
