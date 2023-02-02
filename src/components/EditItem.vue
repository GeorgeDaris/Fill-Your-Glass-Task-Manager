<script setup>
import { ref, nextTick, onMounted } from "vue";

defineProps(["todo", "show"]);
const emit = defineEmits(["edited"]);

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

async function editLabel() {
  editing.value = false;
  emit("edited");
}

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <form v-if="editing">
    <input type="text" v-model.trim.lazy="todo.title" ref="input" />
    <button @click.prevent="editLabel">Save</button>
  </form>
</template>

<style>
form {
  display: inline;
}
</style>
