<script setup>
import { inject, provide, ref } from "vue";
import ArchiveForm from "./ArchiveForm.vue";
import TodoItem from "./TodoItem.vue";

const props = defineProps(["todos"]);
defineEmits(["delete-todo"]);

const shiftTodos = inject("shiftTodos");

const startDrag = (evt, item) => {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  let index = undefined;

  props.todos.forEach((todo, itemIndex) => {
    if (todo.id === item.id) {
      index = itemIndex;
    }
  });
  evt.dataTransfer.setData("itemIndex", index);
  evt.dataTransfer.setData("itemToMove", item);
  console.log(item);
};

const onDrop = (evt, currentItem) => {
  let itemIndex = evt.dataTransfer.getData("itemIndex");
  let itemToMove = evt.dataTransfer.getData("itemToMove");
  let currentIndex = undefined;
  props.todos.forEach((todo, index) => {
    if (todo.id === currentItem.id) {
      currentIndex = index;
    }
  });

  shiftTodos(itemIndex, currentItem, itemToMove, currentIndex);

  console.log(itemToMove, currentIndex);
  // console.log(evt.dataTransfer.getData("ItemIndex"));
};

let showArchiveButton = inject("showArchiveButton");

let archiveFormOpen = ref(false);

const openArchiveForm = () => {
  archiveFormOpen.value = !archiveFormOpen.value;
};

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <div class="col-start-1 grid relative max-[740px]:w-full">
    <section class="col-start-1 mask">
      <!-- <h4>
      <slot />
    </h4> -->
      <ul
        class="pr-1 md:w-64 lg:w-80 h-96 overflow-y-auto scroll-container max-[740px]: md:max-w-[24rem]"
      >
        <TransitionGroup name="todos" tag="ul" appear>
          <li
            class="todo-list-item group"
            v-for="todo in todos.slice().reverse()"
            :key="todo.id"
          >
            <TodoItem
              :todo="todo"
              @delete-todo="$emit('delete-todo', todo)"
              draggable="true"
              @dragstart="startDrag($event, todo)"
              @dragover.prevent
              @dragenter.prevent
              @drop="onDrop($event, todo)"
              @touchstart="startDrag($event, todo)"
              @touchend="onDrop($event, todo)"
            ></TodoItem>
            <hr
              class="bg-lightGrey dark:bg-lightDark h-[0.15rem] border-none rounded-full my-1 mt-2 group-last:hidden group-even:bg-hrOdd dark:group-even:bg-hrDarkOdd"
            />
            <!-- <div class="py-2">
            <hr
              class="bg-accentColor dark:bg-accentColor h-[0.15rem] border-none rounded-full my-1 mt-2"
            />
          </div> -->
          </li>
        </TransitionGroup>
      </ul>
    </section>
    <Transition name="slide-fade">
      <button
        v-if="showArchiveButton"
        @click="openArchiveForm"
        class="archive-button p-1 m-1 mt-4 w-[60%] my-0 mx-auto bg-accentColor rounded-md hover:bg-accentLight text-bgColor dark:text-darkBg"
      >
        <slot />
      </button>
    </Transition>
    <!-- <Teleport to="body"> -->
    <Transition name="slide-fade-top">
      <ArchiveForm
        :todos="todos"
        v-if="archiveFormOpen"
        @closeForm="openArchiveForm"
      ></ArchiveForm>
    </Transition>
    <!-- </Teleport> -->
  </div>
</template>

<style>
.mask {
  /* mask-image: linear-gradient(180deg, transparent 0, #000 5% 95%, transparent); */
  /*   mask-image: linear-gradient(
    180deg,
    transparent 0,
    #000 2% 87%,
    transparent 89%,
    #000 92%
  ); */
  mask-image: linear-gradient(180deg, transparent 0, #000 2% 98%, transparent);
  border-radius: 0.5rem;
}

:root {
  --category-color: "#525798";
}

.edit-container {
  display: inline-block;
}

.todo-color::before {
  content: "";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: var(--category-color);
  border-radius: 50%;
  margin-right: 1rem;
}

.todo-list-item {
  position: relative;
}

.todos-enter-active,
.todos-leave-active {
  transition: all 1.3s ease;
}
.todos-enter-from,
.todos-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.slide-fade-top-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-top-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-top-enter-from,
.slide-fade-top-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.slide-fade-top-router-enter-active {
  transition: opacity 0.3s ease-out;
}

.slide-fade-top-router-leave-active {
  transition: opacity 0.3s ease-out;
}

.slide-fade-top-router-enter-from,
.slide-fade-top-router-leave-to {
  opacity: 0;
  /* transform: translateY(2rem); */
}

.progress-indicator-enter-active,
.progress-indicator-leave-active {
  transition: all 1.3s ease;
}
.progress-indicator-enter-from,
.progress-indicator-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
