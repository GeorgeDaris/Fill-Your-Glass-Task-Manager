<script setup>
import { computed, reactive, provide, watch, ref } from "vue";
import AddTodo from "./components/AddTodo.vue";
import TodoListNew from "./components/TodoListNew.vue";
// import ArchiveForm from "./components/ArchiveForm.vue";

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

const deleteTodo = (todoToDelete) => {
  let todoIndex = todos.findIndex((item) => item.id === todoToDelete.id);
  todos.splice(todoIndex, 1);
};

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
    <!-- <nav class="absolute top-0 bg-accentColor width-full">test</nav> -->
    <!-- <header>-->
    <!-- <pre> -->
    <!-- {{ todos }}
        {{ data }} -->
    <!-- {{ archive }} -->
    <!-- </pre> -->
    <!-- <h1>
          {{ title }}
        </h1>
      </header> -->
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
  </main>
</template>
<!-- class="max-[740px]:grid max-[740px]:justify-center max-[740px]:gap-0 "
 -->
<!-- class="max-[740px]:grid max-[740px]:justify-center" -->

<style></style>
