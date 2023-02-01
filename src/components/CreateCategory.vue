<!-- eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref, nextTick } from "vue";

const emit = defineEmits(["send-category"]);

//let categories = reactive( [ //An array wasn't needed after all, as I'm adding one new category at a time
//{
//title: "",
//image: "", Implement the logic for the image later, using what I did for Frame It
//color: ""
//}
//])

let formOpen = ref(false);
let inputTitle = ref(null);
let warnText = ref("Please add a title");
let warn = ref(false);

let newCategory = reactive({
  title: "",
  color: "#525798", //adding a default value, because `value` can't be used alongside v-model
});

const openForm = async () => {
  if (!formOpen.value) {
    //open the "form" and focus on the first input
    formOpen.value = !formOpen.value;
    await nextTick();
    inputTitle.value.focus();
  } else if (newCategory.title) {
    //From my understanding, this didn't need a `.value` because it isn't a ref
    //categories.push({title: newCategory.title, color: newCategory.color, image: newCategory.image})
    warn.value = false;
    sendCategory();
    newCategory = { title: "", color: "#525798" }; //leaving it with the default color
    formOpen.value = !formOpen.value; //closing the form
  } else {
    warn.value = true;
    await nextTick();
    inputTitle.value.focus();
  }
};

const sendCategory = () => {
  emit("send-category", newCategory);
};

//allow the user to select multiple categories after all
</script>

<template>
  <button @click.prevent="openForm">+ Create new category</button>
  <section v-if="formOpen">
    <label> Title </label>
    <br />
    <input type="text" v-model.trim="newCategory.title" ref="inputTitle" />
    <br />
    <label> Image </label>
    <br />
    <input type="url" v-model.trim="newCategory.image" />
    <br />
    <label> Color </label>
    <br />
    <input type="color" v-model.trim="newCategory.color" />
    <input type="text" v-model.trim="newCategory.color" />
    <br />
    <p v-if="warn">
      {{ warnText }}
    </p>
    <button @click.prevent="openForm">Add category</button>
  </section>
</template>
