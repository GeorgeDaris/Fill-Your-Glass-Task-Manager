<script setup>
import { inject, ref } from "vue";
import ProgressBar from "./ProgressBar.vue";
// import EditTodo from "./EditTodo.vue";
import EditItem from "./EditItem.vue";
import CategoryLabel from "./CategoryLabel.vue";

const props = defineProps(["todo"]);
defineEmits(["delete-todo"]);

const categories = inject("categories");
const updateTodo = inject("updateTodo");

let btnActive = ref("");

// const showBtns = () => {
//   btnActive.value === "edit-container-active"
//     ? (btnActive.value = "")
//     : (btnActive.value = "edit-container-active");

//   // if (isEditing.value) {
//   //   btnActive.value = "edit-container-active";
//   // }
// };

const showBtns = () => {
  btnActive.value = "edit-container-active";
};

const hideBtns = () => {
  btnActive.value = "";
};

let isEditing = ref(false);
let editingText = ref("Edit");

const openEditForm = () => {
  isEditing.value ? (isEditing.value = false) : (isEditing.value = true);
};

let detailsOpen = ref(true);

const showDetails = () => {
  detailsOpen.value ? (detailsOpen.value = false) : (detailsOpen.value = true);
};

let todoChecked = ref(props.todo.completed);

const handleCheckbox = () => {
  updateTodo(props.todo.id, undefined, todoChecked.value);
};

// const summaryCheckbox = ref(null);
// const handleCheckbox = (todo) => {
//recreating the checked functionality for checkboxes inside summary tags, as I had set it to "prevent default" to allow the user to type when editing the label, without opening and closing the summary tag while pressing space
//   summaryCheckbox.value.checked
//     ? ((summaryCheckbox.value.checked = false), (todo.completed = false))
//     : ((summaryCheckbox.value.checked = true), (todo.completed = true));
// };

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <div
    class="hover:opacity-90 transition-opacity duration-300"
    v-if="todo.subTasks && todo.subTasks.length >= 1"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <!-- checking for the lenght as well, since I'm pushing the subtasks anyway in App.vue, to prevent all todos from appearing inside a details element -->
    <!-- <summary @keyup.space.prevent class="wid"> -->
    <!-- prevents the details element from getting toggled while editing a todo -->
    <!-- <input
        class="appearance-none border-[0.15rem] rounded-sm p-[0.38rem] border-accentColor bg-inherit checked:bg-accentColor"
        type="checkbox"
        :checked="todo.completed"
        v-model="todo.completed"
        :id="todo.title"
        @keyup.space="handleCheckbox(todo)"
        ref="summaryCheckbox"
      /> -->
    <button @click="showDetails" class="mr-1 p-1" title="Show sub tasks">
      <svg
        width="16"
        height="14"
        viewBox="0 0 108 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="-rotate-90 pb-1NOT mb-0.5 transition-transform duration-300"
        :class="{ 'rotate-0': detailsOpen }"
      >
        <path
          d="M100.964 23.1555L96.6714 20.5907L100.964 23.1555C105.743 15.1568 99.9804 5 90.6625 5L17.3375 4.99999C8.01958 4.99999 2.25684 15.1568 7.03651 23.1554L43.699 84.509C48.3556 92.3018 59.6444 92.3018 64.301 84.5091L100.964 23.1555Z"
          stroke="#7C94D2"
          stroke-width="10"
          class="stroke-accentColor hover:stroke-accentLight"
        />
      </svg>
    </button>
    <label
      class="inline-flex items-center my-1 relative z-[3]"
      :for="todo.title"
      @dblclick="openEditForm"
    >
      <input
        class="appearance-none border-[0.15rem] rounded-md p-2 border-accentColor bg-inherit peer cursor-pointer checked:bg-accentColor peer"
        type="checkbox"
        :checked="todo.completed"
        v-model="todoChecked"
        :id="todo.id"
        :name="todo.title"
        ref="summaryCheckbox"
        @change="handleCheckbox"
      />
      <svg
        class="absolute ml-1 hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
        width="13"
        height="9"
      >
        <path
          class="fill-bgColor dark:fill-darkBg"
          fill="white"
          d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
        />
      </svg>
      <span
        class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
      >
        {{ todo.title }}
      </span>
    </label>
    <div class="edit-container absolute right-0 top-0 flex" :class="btnActive">
      <button @click="openEditForm" @focus="showBtns">
        {{ editingText }}
      </button>
      <button @click="$emit('delete-todo', todo)" @focus="showBtns">
        Delete
      </button>
    </div>
    <EditItem
      class="todo-edit-form"
      :todo="todo"
      v-if="isEditing"
      @edited="openEditForm"
    ></EditItem>

    <!-- <br /> -->
    <!-- <span
      v-if="category.title === todo.category"
      class="todo-color"
      :style="{ '--category-color': category.color }"
      >{{ todo.category }}</span
    > -->
    <!--Changing the color of the before element-->
    <!-- <br /> -->
    <!-- </summary> -->
    <div class="grid grid-cols-[2.5rem_4fr]">
      <!-- grid grid-cols-[2.5rem_4fr] -->
      <div
        class="col-start-1 row-start-1"
        v-for="category in categories"
        :key="JSON.stringify(category)"
      >
        <CategoryLabel
          :labelColor="category.color"
          :has-sub-tasks="true"
          v-if="category.title === todo.category"
        >
          {{ category.title }}
        </CategoryLabel>
      </div>
      <div class="col-start-2 row-start-1">
        <ProgressBar :total="todo.subTasks" class=""></ProgressBar>
        <p
          v-if="todo.description"
          class="text-sm p-[0.3rem] bg-lightGrey dark:bg-lightDark m-1 rounded-lg"
        >
          {{ todo.description }}
        </p>
        <Transition name="slide-fade">
          <div v-if="detailsOpen">
            <ul>
              <li
                class="ml-[0.3rem]"
                v-for="task in todo.subTasks"
                :key="JSON.stringify(task)"
              >
                <!-- v-for="task in todo.subTasks.slice().reverse()" this shouldn't be needed -->
                <label :for="task.title" class="inline-flex items-center my-0">
                  <input
                    class="appearance-none border-[0.15rem] rounded-full p-2 border-accentColor bg-inherit cursor-pointer checked:bg-accentColor peer"
                    type="checkbox"
                    :checked="task.completed"
                    v-model="task.completed"
                    :id="task.title"
                  />
                  <svg
                    class="absolute ml-1 hidden pointer-events-none peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                    width="13"
                    height="9"
                  >
                    <path
                      class="fill-bgColor dark:fill-darkBg"
                      fill="white"
                      d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
                    />
                  </svg>
                  <span
                    class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
                  >
                    {{ task.title }}
                  </span>
                </label>
                <!-- <div class="edit-container" :class="btnActive">
          <button @click="openEditForm" @focus="showBtns">
            {{ editingText }}
          </button>
          <button @click="$emit('delete-todo', task)" @focus="showBtns">
            Delete
          </button>
        </div>
        <EditItem
          class="todo-edit-form"
          :todo="task"
          v-if="isEditing"
          @edited="openEditForm"
        ></EditItem> -->
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </div>

  <div
    v-else
    draggable="true"
    class="hover:opacity-90 transition-opacity duration-300"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <label
      class="inline-flex items-center my-1"
      :for="todo.title"
      @dblclick="openEditForm"
    >
      <input
        class="appearance-none border-[0.15rem] rounded-md p-2 border-accentColor bg-inherit cursor-pointer hover:border-accentLight checked:bg-accentColor peer"
        type="checkbox"
        :checked="todo.completed"
        v-model="todoChecked"
        :id="todo.id"
        :name="todo.title"
        ref="summaryCheckbox"
        @change="handleCheckbox"
      />
      <svg
        class="absolute ml-1 hidden pointer-events-none peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
        width="13"
        height="9"
      >
        <path
          class="fill-bgColor dark:fill-darkBg"
          fill="white"
          d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
        />
      </svg>
      <span
        class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
      >
        {{ todo.title }}
      </span>
    </label>
    <div class="edit-container absolute right-0 top-0 flex" :class="btnActive">
      <button @click="openEditForm" @focus="showBtns">
        {{ editingText }}
      </button>
      <button @click="$emit('delete-todo', todo)" @focus="showBtns">
        Delete
      </button>
    </div>
    <EditItem
      class="todo-edit-form"
      :todo="todo"
      v-if="isEditing"
      @edited="openEditForm"
    ></EditItem>
    <div
      class="col-start-1 row-start-1"
      v-for="category in categories"
      :key="JSON.stringify(category)"
    >
      <CategoryLabel
        :labelColor="category.color"
        :has-sub-tasks="false"
        v-if="category.title === todo.category"
      >
        {{ category.title }}
      </CategoryLabel>
    </div>
    <!-- <br /> -->
    <ProgressBar
      v-if="todo.subTasks && todo.subTasks.length > 1"
      :total="todo.subTasks"
    ></ProgressBar>
    <p
      v-if="todo.description"
      class="text-sm p-[0.3rem] bg-lightGrey dark:bg-lightDark m-1 rounded-lg ml-[1.7rem]"
    >
      {{ todo.description }}
    </p>
    <!-- <br /> -->
    <!-- <div v-for="category in categories" :key="JSON.stringify(category)">
      <span
        v-if="category.title === todo.category"
        class="todo-color"
        :style="{ '--category-color': category.color }"
        >{{ todo.category }}</span
      > -->
    <!--Changing the color of the before element-->
    <!-- </div> -->
  </div>
</template>

<style>
:root {
  --category-color: "#525798";
}

.edit-container {
  display: inline-block;
  opacity: 0;
}

.edit-container-active {
  opacity: 1;
}

/* body {
  color: white;
  background: #36393f;
} */

.todo-color::before {
  content: "";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: var(--category-color);
  border-radius: 50%;
  margin-right: 1rem;
}

.todo-edit-form {
  position: absolute;
  left: 1rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateY(-2px); */
  opacity: 0;
}

/* summary {
  list-style: none;
  position: relative;
}

summary::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  background-image: url(https://vitejs.dev/logo-with-shadow.png);
  background-repeat: no-repeat;
  background-color: aqua;
  position: absolute;
  top: 0;
  left: -0.4rem;
  z-index: 30;
} */

/* summary::marker {
  content: url(../assets/details_icon.svg);
} */
/* 
summary:hover::marker {
  content: url(https://sponsors.vuejs.org/images/vue_jobs.png);
  transition: all 0.7s;
} */
</style>
