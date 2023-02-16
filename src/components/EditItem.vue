<script setup>
import { ref, onMounted, inject } from "vue";

const props = defineProps(["todo", "show"]);
const emit = defineEmits(["edited"]);
const updateTodo = inject("updateTodo");

let editing = ref(true);
let input = ref(null);

// async function editLabel() {
//   editing.value = !editing.value;
//   await nextTick(); //to wait for the DOM to update and focus on the input element
//   if (editingText.value === `Edit`) {
//     editingText.value = `Save`;
//     input.value.focus();
//   } else {
//     editingText.value = `Edit`;
//   }
// }

let newTitle = ref(props.todo.title);

async function editLabel() {
  editing.value = false;
  emit("edited");
  updateTodo(props.todo.id, newTitle.value);
  // console.log(props.todo.id, newTitle.value);
}

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <form v-if="editing">
    <input type="text" v-model.trim.lazy="newTitle" ref="input" />
    <button @click.prevent="editLabel">Save</button>
  </form>
</template>

<style>
form {
  display: inline;
}
</style>
