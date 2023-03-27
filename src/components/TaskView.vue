<script setup>
import { computed, reactive, provide, inject, watch, ref } from "vue";
import AddTodo from "./AddTodo.vue";
import TodoListNew from "./TodoListNew.vue";

import ProgressBar from "./ProgressBar.vue";

// let title = ref("Fill Your Cup Todo App (test)");
// let todos = reactive([]);
// //using localstorage to retrieve todos
// if (localStorage.todos) {
//   let storageTodos = JSON.parse(localStorage.getItem("todos"));
//   storageTodos.forEach((todo) => {
//     todos.push(todo);
//   });
//   console.log(todos);
// } else {
//   todos = reactive([
//     {
//       id: 1,
//       title: "Make it work",
//       category: "Personal",
//       completed: true,
//       archived: false,
//     },
//     {
//       id: 0,
//       title: "Create a vue todo app",
//       description: "test",
//       category: "Personal",
//       completed: false,
//       archived: false,
//       subTasks: [
//         {
//           id: 0,
//           title: "make sub-tasks work",
//           completed: true,
//         },
//         {
//           id: 1,
//           title: "Style it with CSS",
//           completed: false,
//         },
//       ],
//     },
//   ]);
// }
// let data = reactive({});

const todos = inject("todos");

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

const todosCompleted = computed(() => {
  //only if they haven't been archived yet
  let completedTodos = todos.filter(
    (item) => item.completed && !item.archived
  ).length;
  // return `${completedTodos} of ${todos.length} completed`;
  if (completedTodos < 2) {
    return `Archive ${completedTodos} task`;
  } else {
    return `Archive ${completedTodos} tasks`;
  }
});

const addTodo = inject("addTodo");
const deleteTodo = inject("deleteTodo");
inject("updateTodo");

const shiftTodos = (itemIndex, currentItem, itemToMove, currentIndex) => {
  // todos.splice(itemIndex, 1, currentItem);
  // todos.splice(currentIndex, 1, itemToMove);
  // currentIndex = currentIndex--;
  // todos.splice(currentIndex, 1, itemToMove);
  // todos.splice(currentIndex, 1, itemToMove.title);

  //currently swaps them
  [todos[itemIndex], todos[currentIndex]] = [
    todos[currentIndex],
    todos[itemIndex],
  ];

  console.log(itemToMove, currentIndex);
};

provide("shiftTodos", shiftTodos);

let showArchiveButton = ref();
provide("showArchiveButton", showArchiveButton);
//changing the todos localStorage item every time a change occurs
watch(
  todos,
  (newValue) => {
    localStorage.setItem("todos", JSON.stringify(newValue));
    console.log(newValue);

    if (todos.filter((item) => item.completed && !item.archived).length > 0) {
      showArchiveButton.value = true;
    } else {
      showArchiveButton.value = false;
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

const categories = inject("categories");

const addCategory = (category) => {
  //Emitted event from AddTodo, which came from CreateCategory
  let id = Math.floor(Date.now() * Math.random());
  // categories.push(category);
  categories.push({
    id: id++,
    title: category.title,
    color: category.color,
  });
};

watch(
  categories,
  (newValue) => {
    localStorage.setItem("categories", JSON.stringify(newValue));
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div
    class="grid md:grid-cols-[minmax(5rem,_1.5fr)_minmax(7rem,_2fr)] justify-center gap-4 grid-cols-1 md:gap-x-20 lg:gap-x-28 xl:gap-x-32 mt-12 mx-4 md:m-0 md:"
  >
    <AddTodo
      @add-todo="addTodo"
      @add-category="addCategory"
      :categories="categories"
    />
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
