<script setup>
import { inject, ref } from "vue";
import ProgressBar from "./ProgressBar.vue";
import EditTodo from "./EditTodo.vue";
import EditItem from "./EditItem.vue";

defineProps(["todo"]);
defineEmits(["delete-todo"]);

const categories = inject("categories");
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

const summaryCheckbox = ref(null);
const handleCheckbox = (todo) => {
  //recreating the checked functionality for checkboxes inside summary tags, as I had set it to "prevent default" to allow the user to type when editing the label, without opening and closing the summary tag while pressing space
  summaryCheckbox.value.checked
    ? ((summaryCheckbox.value.checked = false), (todo.completed = false))
    : ((summaryCheckbox.value.checked = true), (todo.completed = true));
};

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <details
    open
    class=""
    v-if="todo.subTasks && todo.subTasks.length >= 1"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <!-- checking for the lenght as well, since I'm pushing the subtasks anyway in App.vue, to prevent all todos from appearing inside a details element -->
    <summary @keyup.space.prevent class="wid">
      <!-- prevents the details element from getting toggled while editing a todo -->
      <input
        class="appearance-none border-[0.15rem] rounded-sm p-[0.28rem] border-accentColor bg-inherit checked:bg-accentColor"
        type="checkbox"
        :checked="todo.completed"
        v-model="todo.completed"
        :id="todo.title"
        @keyup.space="handleCheckbox(todo)"
        ref="summaryCheckbox"
      />
      <label class="pl-2" :for="todo.title" @dblclick="openEditForm">{{
        todo.title
      }}</label>
      <div class="edit-container" :class="btnActive">
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
      <ProgressBar :total="todo.subTasks"></ProgressBar>
      <p
        v-if="todo.description"
        class="text-sm p-[0.3rem] bg-lightGrey dark:bg-lightDark m-1 rounded-lg"
      >
        {{ todo.description }}
      </p>
      <br />
      <div v-for="category in categories" :key="JSON.stringify(category)">
        <span
          v-if="category.title === todo.category"
          class="todo-color"
          :style="{ '--category-color': category.color }"
          >{{ todo.category }}</span
        >
        <!--Changing the color of the before element-->
      </div>
      <br />
    </summary>
    <ul>
      <li
        v-for="task in todo.subTasks.slice().reverse()"
        :key="JSON.stringify(task)"
      >
        <input
          type="checkbox"
          :checked="task.completed"
          v-model="task.completed"
          :id="task.title"
        />
        <label :for="task.title">{{ task.title }}</label>
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
  </details>

  <div
    v-else
    draggable="true"
    class=""
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      v-model="todo.completed"
      :id="todo.title"
    />
    <label class="m-1" :for="todo.title" @dblclick="openEditForm">{{
      todo.title
    }}</label>
    <div class="edit-container" :class="btnActive">
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
    <ProgressBar
      v-if="todo.subTasks && todo.subTasks.length > 1"
      :total="todo.subTasks"
    ></ProgressBar>
    <p
      v-if="todo.description"
      class="text-sm p-[0.3rem] bg-lightGrey dark:bg-lightDark m-1 rounded-lg"
    >
      {{ todo.description }}
    </p>
    <!-- <br /> -->
    <div v-for="category in categories" :key="JSON.stringify(category)">
      <span
        v-if="category.title === todo.category"
        class="todo-color"
        :style="{ '--category-color': category.color }"
        >{{ todo.category }}</span
      >
      <!--Changing the color of the before element-->
    </div>
    <hr
      class="bg-lightGrey dark:bg-lightDark h-[0.15rem] border-none rounded-full my-1"
    />
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
  content: url(https://vitejs.dev/logo-with-shadow.png);
}
summary:hover::marker {
  content: url(https://sponsors.vuejs.org/images/vue_jobs.png);
  transition: all 0.7s;
} */
</style>
