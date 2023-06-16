<script setup>
import { inject, ref, onMounted } from "vue";
import AddTodo from "./AddTodo.vue";

const props = defineProps(["show", "itemArray", "item", "itemType"]);
const deleteItem = inject("deleteItem");
let itemArray;

// if (typeof props.itemArray !== "string") {
//   itemArray = props.itemArray;
// } else {
//using the string passed through the prop to find the right array from App.vue
itemArray = inject(`${props.itemArray}`);
// }

const editContainer = ref(null);
let parent = {};

let show = ref(false);
const showBtns = () => (show.value = true);
const hideBtns = () => (show.value = false);

onMounted(() => {
  parent = editContainer.value.parentElement;

  //showing and removing the buttons when the user hovers over the parent element
  parent.addEventListener("mouseenter", () => {
    showBtns();
  });

  parent.addEventListener("mouseleave", () => {
    hideBtns();
  });
});

// Handling the edit functionality
let editing = ref(false);

const showEditForm = () => {
  editing.value = !editing.value;
};

const categories = inject("categories");
</script>

<template>
  <div
    class="opacity-0 absolute right-0 top-0 flex z-50 transition-opacity duration-150"
    ref="editContainer"
    :class="show ? 'opacity-100' : ''"
  >
    <slot />
    <button
      class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
      @focus="showBtns"
      @click="showEditForm"
      title="edit"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="fill-textColor dark:fill-darkText"
          d="M64.2254 2.82843C65.7875 1.26633 68.3201 1.26633 69.8822 2.82843L80.4888 13.435C82.0509 14.9971 82.0509 17.5298 80.4888 19.0919L74.832 24.7487L58.5685 8.48528L64.2254 2.82843Z"
          fill="black"
        />
        <path
          class="stroke-textColor dark:stroke-darkText"
          d="M55.1543 16.8492L66.468 28.1629L21.9202 72.7106C18.7961 75.8348 13.7307 75.8348 10.6065 72.7106C7.48235 69.5864 7.48235 64.5211 10.6065 61.3969L55.1543 16.8492Z"
          stroke="black"
          stroke-width="7"
        />
      </svg>
    </button>
    <button
      class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
      @click="deleteItem(itemArray, props.item)"
      @focus="showBtns"
      @blur="hideBtns"
      title="delete"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="27"
          rx="2"
          stroke="black"
          stroke-width="3"
          class="stroke-textColor dark:stroke-darkText"
        />
        <rect
          y="2"
          width="24"
          height="2"
          rx="1"
          fill="black"
          class="fill-textColor dark:fill-darkText"
        />
        <rect
          x="8"
          y="28"
          width="20"
          height="2"
          rx="1"
          transform="rotate(-90 8 28)"
          fill="black"
          class="fill-textColor dark:fill-darkText"
        />
        <rect
          x="7"
          y="1"
          width="10"
          height="1"
          rx="0.5"
          fill="black"
          class="fill-textColor dark:fill-darkText"
        />
        <rect
          x="11"
          width="2"
          height="2"
          rx="1"
          fill="black"
          class="fill-textColor dark:fill-darkText"
        />
        <rect
          x="14"
          y="28"
          width="20"
          height="2"
          rx="1"
          transform="rotate(-90 14 28)"
          fill="black"
          class="fill-textColor dark:fill-darkText"
        />
      </svg>
    </button>
    <teleport to="body">
      <transition name="todos">
        <div
          v-if="editing && itemType == 'todo'"
          class="absolute bg-[rgba(255,255,255,0.31)] backdrop-blur-sm w-full h-full flex justify-center z-[70] dark:bg-[rgba(29,33,42,0.23)]"
        >
          <div class="mt-10">
            <AddTodo
              class=""
              :categories="categories"
              :todo-to-edit="item"
              @update-todo="showEditForm"
            >
              Editing
            </AddTodo>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style>
.slide-fade-top-short-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-top-short-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-top-short-enter-from,
.slide-fade-top-short-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
