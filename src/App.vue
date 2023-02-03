<script setup>
import { ref, computed, reactive, provide } from "vue";
import AddTodo from "./components/AddTodo.vue";
// import TodoList from "./components/TodoList.vue";
import TodoListNew from "./components/TodoListNew.vue";

import ProgressBar from "./components/ProgressBar.vue";

// let title = ref("Fill Your Cup Todo App (test)");
const todos = reactive([
  {
    id: 0,
    title: "Create a vue todo app",
    description: "test",
    category: "Personal",
    completed: false,
    subTasks: [
      {
        id: 0,
        title: "make sub-tasks work",
        completed: true,
      },
      {
        id: 1,
        title: "Style it with CSS",
        completed: false,
      },
    ],
  },
  {
    id: 1,
    title: "Make it work",
    category: "Personal",
    completed: true,
  },
]);

const todosCompleted = computed(() => {
  const completedTodos = todos.filter((item) => item.completed).length;
  return `${completedTodos} of ${todos.length} completed`;
});

const addTodo = (newTodo) => {
  let id = Math.floor(Date.now() * Math.random());
  todos.push({
    id: id++,
    title: newTodo.title,
    description: newTodo.description,
    category: newTodo.category,
    subTasks: newTodo.subTasks,
  });
};

const deleteTodo = (todoToDelete) => {
  let todoIndex = todos.findIndex((item) => item.id === todoToDelete.id);
  todos.splice(todoIndex, 1);
};

const categories = reactive([
  {
    id: 0,
    title: "Work",
    image: "test",
    color: "#a23f3f",
  },
  {
    id: 1,
    title: "Personal",
    image: "test",
    color: "#525798",
  },
]);

const addCategory = (category) => {
  //Emitted event from AddTodo, which came from CreateCategory
  //console.log(newCategories)
  //let id = categories.length
  //categories.push({id: id++, title: newCategories.title, image: newCategories.image, color: newCategories.color})
  //newCategories.forEach(category => {
  categories.push(category);
  //})
};

provide("categories", categories);
</script>

<template>
  <!-- <div> -->
  <main class="">
    <!-- <header>-->
    <!--<pre>
        {{ todos }}
        </pre>-->
    <!-- <h1>
          {{ title }}
        </h1>
      </header> -->
    <!-- <div class="grid items-center w-auto"> -->
    <!-- [1.5fr_2fr] -->
    <div
      class="grid md:grid-cols-[minmax(5rem,_1.5fr)_minmax(7rem,_2fr)] justify-center gap-4 m-12"
    >
      <AddTodo
        @add-todo="addTodo"
        @add-category="addCategory"
        :categories="categories"
      />
      <!-- <TodoList :todos="todos" @delete-todo="deleteTodo">{{
        todosCompleted
      }}</TodoList> -->
      <TodoListNew :todos="todos" @delete-todo="deleteTodo">{{
        todosCompleted
      }}</TodoListNew>
      <ProgressBar class="glass" :total="todos"></ProgressBar>
    </div>
    <!-- </div> -->
  </main>
  <!-- </div> -->
</template>

<style></style>
