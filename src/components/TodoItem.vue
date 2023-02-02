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

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <details
    open
    v-if="todo.subTasks && todo.subTasks.length >= 1"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <!-- checking for the lenght as well, since I'm pushing the subtasks anyway in App.vue, to prevent all todos from appearing inside a details element -->
    <summary @keyup.space.prevent>
      <!-- prevents the details element from getting toggled while editing a todo -->
      <input
        type="checkbox"
        :checked="todo.completed"
        v-model="todo.completed"
        :id="todo.title"
      />
      <label :for="todo.title" @dblclick="openEditForm">{{ todo.title }}</label>
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
      <span>{{ todo.description }}</span>
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
      </li>
    </ul>
  </details>

  <div v-else draggable="true">
    <input
      type="checkbox"
      :checked="todo.completed"
      v-model="todo.completed"
      :id="todo.title"
    />
    <label :for="todo.title">{{ todo.title }}</label>
    <div class="edit-container">
      <EditTodo :todo="todo"></EditTodo>
      <button @click="$emit('delete-todo', todo)">Delete</button>
    </div>
    <br />
    <ProgressBar
      v-if="todo.subTasks && todo.subTasks.length > 1"
      :total="todo.subTasks"
    ></ProgressBar>
    <span>{{ todo.description }}</span>
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

body {
  color: white;
  background: #36393f;
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

.todo-edit-form {
  position: absolute;
  left: 1rem;
}
</style>
