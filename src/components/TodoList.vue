<script setup>
import { ref, computed, inject } from "vue";
import ProgressBar from "./ProgressBar.vue";
import EditTodo from "./EditTodo.vue";

defineProps(["todos"]);
defineEmits(["delete-todo"]);

let categoryColor = ref("");

const categories = inject("categories");
/*const setCategoryColor = computed((todoCategory) => {
  for (category in categories) {
    if(todoCategory === category.color) {
      return category.color
    }
  }
})*/

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion
//Look into creating a unique label
</script>

<template>
  <section>
    <h4>
      <slot />
    </h4>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <details open v-if="todo.subTasks && todo.subTasks.length >= 1">
          <!-- checking for the lenght as well, since I'm pushing the subtasks anyway in App.vue, to prevent all todos from appearing inside a details element -->
          <summary @keyup.space.prevent>
            <!-- prevents the details element from getting toggled while editing a todo -->
            <input
              type="checkbox"
              :checked="todo.completed"
              v-model="todo.completed"
              :id="todo.id"
            />
            <label :for="todo.id">{{ todo.title }}</label>
            <div class="edit-container">
              <EditTodo :todo="todo"></EditTodo>
              <button @click="$emit('delete-todo', todo)">Delete</button>
            </div>
            <ProgressBar :total="todo.subTasks"></ProgressBar>
            <span>{{ todo.description }}</span>
            <br />
            <div v-for="category in categories">
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
            <li v-for="task in todo.subTasks">
              <input
                type="checkbox"
                :checked="task.completed"
                v-model="task.completed"
              />
              <label>{{ task.title }}</label>
            </li>
          </ul>
        </details>

        <div v-else draggable="true">
          <input
            type="checkbox"
            :checked="todo.completed"
            v-model="todo.completed"
            :id="todo.id"
          />
          <label :for="todo.id">{{ todo.title }}</label>
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
          <div v-for="category in categories">
            <span
              v-if="category.title === todo.category"
              class="todo-color"
              :style="{ '--category-color': category.color }"
              >{{ todo.category }}</span
            >
            <!--Changing the color of the before element-->
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style>
:root {
  --category-color: "#525798";
}

.edit-container {
  display: inline-block;
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
</style>
