<script setup>
import { ref, nextTick } from "vue";

defineProps(["todo", "show"]);
defineEmits(["show-hide"]);

let editing = ref(false);
let editingText = ref("Edit");
let input = ref(null);

async function editLabel() {
  editing.value = !editing.value;
  await nextTick(); //to wait for the DOM to update and focus on the input element
  if (editingText.value === `Edit`) {
    editingText.value = `Save`;
    input.value.focus();
  } else {
    editingText.value = `Edit`;
  }
}
</script>

<template>
  <form>
    <input
      type="text"
      v-if="editing"
      v-model.trim="todo.title"
      ref="input"
      @focusin="$emit('show-hide')"
    />
    <button
      @click.prevent="editLabel"
      @focusin="$emit('show-hide')"
      @focusout="$emit('show-hide')"
    >
      {{ editingText }}
    </button>
  </form>
</template>

<style>
form {
  display: inline;
}
</style>
