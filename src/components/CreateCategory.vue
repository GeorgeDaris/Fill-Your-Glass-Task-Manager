<!-- eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref, nextTick } from "vue";

const emit = defineEmits(["send-category"]);

//let categories = reactive( [ //An array wasn't needed after all, as I'm adding one new category at a time

//image: "", Implement the logic for the image later, using what I did for Frame It

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
  } else {
    formOpen.value = !formOpen.value;
  }
};

const handleForm = async () => {
  if (newCategory.title) {
    //From my understanding, this didn't need a `.value` because it isn't a ref
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
  <button
    class="w-[2.2rem] h-[2.2rem] m-1 z-[4] rounded-md bg-accentColor text-bgColor text-xl font-bold flex items-center justify-center flex-shrink-0 transition-colors duration-300 hover:bg-accentLight hover:transition-colors hover:duration-300 dark:text-darkBg"
    @click.prevent="openForm"
    title="add a new category"
    id="add-category"
  >
    <svg
      class=""
      width="20"
      height="20"
      viewBox="0 0 34 34"
      fill="none"
      role="presentation"
      aria-labelledby="add-category"
      xmlns="http://www.w3.org/2000/svg"
      v-if="!formOpen"
    >
      <rect
        class="fill-bgColor dark:fill-darkBg"
        y="15.3024"
        width="33.8837"
        height="3.27907"
        rx="1.63953"
        fill="white"
      />
      <rect
        class="fill-bgColor dark:fill-darkBg"
        x="18.5814"
        width="33.8837"
        height="3.27907"
        rx="1.63953"
        transform="rotate(90 18.5814 0)"
        fill="white"
      />
    </svg>
    <svg
      width="20"
      height="20"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-else
    >
      <rect
        class="fill-bgColor dark:fill-darkBg"
        y="15.3024"
        width="33.8837"
        height="3.27907"
        rx="1.63953"
        fill="white"
      />
    </svg>
  </button>
  <Transition name="slide-fade">
    <section v-if="formOpen" class="flex flex-col">
      <label class="m-1" for="Category"> Title </label>
      <input
        class="border-[0.1rem] rounded-md p-1 border-accentColor bg-inherit m-1"
        type="text"
        v-model.trim="newCategory.title"
        id="Category"
        name="Category"
        ref="inputTitle"
      />
      <p class="m-1" v-if="warn">
        {{ warnText }}
      </p>
      <!-- <label> Image </label>
    <br />
    <input type="url" v-model.trim="newCategory.image" /> -->

      <label class="m-1" for="color">
        <span> Color </span>

        <div class="flex">
          <input
            class="border-[0.1rem] border-r-0 border-accentColor bg-inherit my-1"
            type="color"
            v-model.trim="newCategory.color"
            id="color"
            name="color"
          />
          <input
            class="w-20 border-[0.1rem] rounded-md rounded-l-none p-1 border-accentColor bg-inherit my-1"
            type="text"
            name="color"
            v-model.trim="newCategory.color"
            id="color"
          />
        </div>
      </label>

      <button
        @click.prevent="handleForm"
        class="p-1 m-1 mb-2 bg-accentColor rounded-md hover:bg-accentLight text-bgColor dark:text-darkBg"
      >
        Add category
      </button>
    </section>
  </Transition>
</template>

<style>
input[type="color"] {
  display: block;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  padding: 0;
  height: 2.3rem;
  border-radius: 0.2rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

input[type="color"]:hover {
  border-radius: 0.2rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: box-shadow 0.3s;
}

/*Taken from this pen: https://codepen.io/leemartin/details/ExPXRzx */
::-webkit-color-swatch-wrapper {
  padding: 0;
}

::-webkit-color-swatch {
  border: 0;
  border-radius: 0;
}

::-moz-color-swatch,
::-moz-focus-inner {
  border: 0;
  border-radius: 0.1rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

::-moz-focus-inner {
  padding: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
