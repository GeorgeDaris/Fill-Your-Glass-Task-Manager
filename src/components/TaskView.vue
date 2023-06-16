<script setup>
import { inject } from "vue";
import AddTodo from "./AddTodo.vue";
import TodoListNew from "./TodoListNew.vue";

import ProgressBar from "./ProgressBar.vue";

// let data = reactive({});

const todos = inject("todos");

//For the API version
// async function getTodos() {
//   const requestURL = "http://localhost:3000/todo";
//   const request = new Request(requestURL);

//   const response = await fetch(request);
//   data.value = await response.json();
// }

// let todos = reactive([]);

// onBeforeMount(() => {
//   getTodos();

//   todos = data.value;
// });

const todosCompleted = inject("todosCompleted");

const addTodo = inject("addTodo");
const deleteTodo = inject("deleteTodo");
inject("updateTodo");

const categories = inject("categories");

const addCategory = inject("addCategory");

const scheduledTodos = inject("scheduledTodos");

const loadScheduledTasks = () => {
  scheduledTodos.forEach((todo) => {
    //adding the scheduled tasks once the date arrives, only if it hasn't been completed yet
    if (
      new Date().toISOString().split("T")[0] == todo.date &&
      !todo.completed
    ) {
      todos.push(todo);
    }
  });

  //removing any duplicates for when the user reloads the page
  for (let i = todos.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (todos[i].id === todos[j].id) {
        todos.splice(i, 1);
        break;
      }
    }
  }
};

loadScheduledTasks();
</script>

<template>
  <div
    class="grid md:grid-cols-[minmax(5rem,_1.5fr)_minmax(7rem,_2fr)] justify-center gap-4 grid-cols-1 md:gap-x-20 lg:gap-x-28 xl:gap-x-32 mtNOT-12 mx-4 md:m-0 md:ml-8"
  >
    <AddTodo
      @add-todo="addTodo"
      @add-category="addCategory"
      :categories="categories"
    >
      What needs to be done?
    </AddTodo>
    <TodoListNew :todos="todos" @delete-todo="deleteTodo">
      <span>{{ todosCompleted }} </span>
    </TodoListNew>
    <!-- <ArchiveForm :todos="todos"></ArchiveForm> -->
    <ProgressBar
      class="glass"
      :total="todos"
      :glass="true"
      :tube="false"
    ></ProgressBar>
  </div>
</template>
