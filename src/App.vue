<script setup>
// import AddTodo from "./components/AddTodo.vue";
// import TodoListNew from "./components/TodoListNew.vue";

// import ProgressBar from "./components/ProgressBar.vue";
import { reactive, provide, watch } from "vue";

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
      archived: false,
    },
    {
      id: 0,
      title: "Create a vue todo app",
      description: "test",
      category: "Personal",
      completed: false,
      archived: false,
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

provide("todos", todos);

const addTodo = (newTodo) => {
  let id = Math.floor(Date.now() * Math.random());
  todos.push({
    id: id++,
    title: newTodo.title,
    description: newTodo.description,
    category: newTodo.category,
    archived: false,
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

provide("addTodo", addTodo);

const deleteTodo = (todoToDelete) => {
  let todoIndex = todos.findIndex((item) => item.id === todoToDelete.id);
  todos.splice(todoIndex, 1);
};

provide("deleteTodo", deleteTodo);

const updateTodo = (todoId, newTitle, checkStatus, archiveStatus) => {
  let todoToEdit = todos.find((item) => item.id === todoId);

  if (newTitle) {
    //in case we are updating the title
    todoToEdit.title = newTitle;
  } else if (archiveStatus) {
    //or archiving a completed task
    todoToEdit.archived = archiveStatus;
  } else {
    //or just toggling the checkbox
    todoToEdit.completed = checkStatus;
  }
};

provide("updateTodo", updateTodo); //for the EditItem component

let categories = reactive([]);
if (localStorage.categories) {
  let storedCategories = JSON.parse(localStorage.getItem("categories"));
  storedCategories.forEach((category) => {
    categories.push(category);
  });
  // console.log(todos);
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

provide("categories", categories);

let archive = reactive([]);

if (localStorage.archive) {
  let storedEntries = JSON.parse(localStorage.archive);
  storedEntries.forEach((entry) => {
    archive.push(entry);
  });
} else {
  archive = reactive([
    {
      id: "",
      title: "",
      notes: "",
      tasks: [],
      date: {
        year: "",
        month: "",
        day: "",
        weekday: "",
        hour: "",
        minutes: "",
      },
    },
  ]);
}

watch(
  archive,
  (newValue) => {
    localStorage.setItem("archive", JSON.stringify(newValue));
  },
  {
    deep: true,
  }
);

const addArchiveEntry = (newEntry) => {
  archive.push(newEntry);
};

provide("archive", archive);
provide("addArchiveEntry", addArchiveEntry);
</script>

<template>
  <main class="">
    <nav
      class="fixed top-0 left-0 border-r-2 border-lightGrey h-full p-2 dark:border-lightDark"
    >
      <ul>
        <li>
          <router-link to="/">📋</router-link>
        </li>
        <li>
          <router-link to="/archive">🗄️</router-link>
        </li>
      </ul>
    </nav>

    <router-view v-slot="{ Component }">
      <!-- <transition name="slide-fade-top-router"> -->
      <component :is="Component" :key="$route.path" />
      <!-- </transition> -->
    </router-view>
  </main>
</template>
<!-- class="max-[740px]:grid max-[740px]:justify-center max-[740px]:gap-0 "
 -->
<!-- class="max-[740px]:grid max-[740px]:justify-center" -->

<style></style>
