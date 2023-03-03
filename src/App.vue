<script setup>
import {
  computed,
  reactive,
  provide,
  onBeforeMount,
  watch,
  onMounted,
} from "vue";
import AddTodo from "./components/AddTodo.vue";
import TodoListNew from "./components/TodoListNew.vue";

import ProgressBar from "./components/ProgressBar.vue";

// let title = ref("Fill Your Cup Todo App (test)");
let todos = reactive([]);
//using localstorage to retrieve todos
if (localStorage.todos) {
  let storageTodos = JSON.parse(localStorage.getItem("todos"));
  storageTodos.forEach((todo) => {
    todos.push(todo);
  });
  console.log(todos);
} else {
  todos = reactive([
    {
      id: 1,
      title: "Make it work",
      category: "Personal",
      completed: true,
    },
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
  ]);
}
// let data = reactive({});

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

// const addTodo = (newTodo) => {
//   fetch("http://localhost:3000/todo", {
//     method: "POST", // or 'PUT'
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTodo),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

const deleteTodo = (todoToDelete) => {
  let todoIndex = todos.findIndex((item) => item.id === todoToDelete.id);
  todos.splice(todoIndex, 1);
};

const updateTodo = (todoId, newTitle, checkStatus) => {
  let todoToEdit = todos.find((item) => item.id === todoId);

  if (newTitle) {
    //in case we are updating the title
    todoToEdit.title = newTitle;
  } else {
    //or just toggling the checkbox
    todoToEdit.completed = checkStatus;
  }
};

provide("updateTodo", updateTodo); //for the EditItem component

//changing the todos localStorage item every time a change occurs
watch(
  todos,
  (newValue) => {
    localStorage.setItem("todos", JSON.stringify(newValue));
    console.log(newValue);
  },
  {
    deep: true,
  }
);

let categories = reactive([]);
if (localStorage.categories) {
  let storedCategories = JSON.parse(localStorage.getItem("categories"));
  storedCategories.forEach((category) => {
    categories.push(category);
  });
  console.log(todos);
} else {
  categories = reactive([
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
}

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

provide("categories", categories);

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
  <main class="">
    <!-- <header>-->
    <!-- <pre>
        {{ todos }}
        {{ data }}
        </pre> -->
    <!-- <h1>
          {{ title }}
        </h1>
      </header> -->
    <div
      class="grid md:grid-cols-[minmax(5rem,_1.5fr)_minmax(7rem,_2fr)] justify-center gap-4 md:gap-x-20 lg:gap-x-28 xl:gap-x-32 mt-12 md:m-0 md:"
    >
      <AddTodo
        @add-todo="addTodo"
        @add-category="addCategory"
        :categories="categories"
      />
      <TodoListNew :todos="todos" @delete-todo="deleteTodo">{{
        todosCompleted
      }}</TodoListNew>
      <ProgressBar
        class="glass"
        :total="todos"
        :glass="true"
        :tube="false"
      ></ProgressBar>
    </div>
  </main>
</template>
<!-- class="max-[740px]:grid max-[740px]:justify-center max-[740px]:gap-0 "
 -->
<!-- class="max-[740px]:grid max-[740px]:justify-center" -->

<style></style>
