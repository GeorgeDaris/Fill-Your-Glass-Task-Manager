<script setup>
import { reactive, provide, watch, ref, computed } from "vue";

import NavBar from "./components/NavBar.vue";

import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/common";

//setting up marked to use across the app for markdown support and code highlighting
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

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
      title: "Welcome the user",
      description:
        "Welcome to Fill Your Cup! A task manager complete with markdown supported notes and a calendar.",
      completed: true,
      archived: false,
    },
    {
      id: 0,
      title: "Create a task management app using Vue.",
      description: "test",
      category: "Personal",
      completed: true,
      archived: false,
      subTasks: [
        {
          id: 2,
          title: "make sub-tasks work",
          completed: true,
        },
        {
          id: 3,
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

const updateTodo = (todoId, newContent, checkStatus, archiveStatus) => {
  let todoToEdit = todos.find((item) => item.id === todoId);

  if (newContent) {
    //in case we are updating the content of the task
    // let id = todoToEdit.id;
    todoToEdit.title = newContent.title;
    todoToEdit.description = newContent.description;
    todoToEdit.category = newContent.category;
    todoToEdit.subTasks = newContent.subTasks;
    // todoToEdit.id = id;
    // console.log(newContent);
  } else if (archiveStatus) {
    //or archiving a completed task
    todoToEdit.archived = archiveStatus;
  } else {
    //or just toggling the checkbox
    todoToEdit.completed = checkStatus;

    //marking the scheduled task as completed
    if (todoToEdit.date) {
      let scheduledTask = scheduledTodos.find((item) => item.id == todoId);
      scheduledTask.completed = true;
    }
  }
};

provide("updateTodo", updateTodo); //for the EditItem component

const shiftTodos = (itemIndex, currentItem, itemToMove, currentIndex) => {
  //currently swaps them
  [todos[itemIndex], todos[currentIndex]] = [
    todos[currentIndex],
    todos[itemIndex],
  ];

  console.log(itemToMove, currentIndex);
};

provide("shiftTodos", shiftTodos);

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

provide("todosCompleted", todosCompleted);

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

provide("addCategory", addCategory);

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
  archive = reactive([]);
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

provide("archive", archive);
provide("addArchiveEntry", addArchiveEntry);

let scheduledTodos = reactive([]);

if (localStorage.scheduledTodos) {
  let storedTodos = JSON.parse(localStorage.scheduledTodos);
  storedTodos.forEach((todo) => {
    scheduledTodos.push(todo);
  });
} else {
  scheduledTodos = reactive([
    {
      id: 0,
      title: "This is a scheduled task",
      description: "test",
      category: "Personal",
      completed: false,
      archived: false,
      date: "2023-05-16",
      subTasks: [
        {
          id: 0,
          title: "Make them work",
          completed: true,
        },
        {
          id: 1,
          title: "Have them appear in the task view once the date has come",
          completed: false,
        },
      ],
    },
    {
      id: 1,
      title: "Another one",
      category: "Testing",
      completed: false,
      archived: false,
      date: "2023-05-25",
    },
    {
      id: 2,
      title: "2",
      category: "Work",
      completed: false,
      archived: false,
      date: "2023-05-25",
    },
    {
      id: 3,
      title: "Different date",
      category: "Work",
      completed: false,
      archived: false,
      date: "2023-05-26",
    },
  ]);
}

provide("scheduledTodos", scheduledTodos);

const addScheduledTodo = (newTodo, scheduledDate) => {
  let id = Math.floor(Date.now() * Math.random());
  scheduledTodos.push({
    id: id++,
    title: newTodo.title,
    description: newTodo.description,
    category: newTodo.category,
    archived: false,
    date: scheduledDate,
    subTasks: newTodo.subTasks,
  });
};

provide("addScheduledTodo", addScheduledTodo);

watch(
  scheduledTodos,
  (newValue) => {
    localStorage.setItem("scheduledTodos", JSON.stringify(newValue));
    console.log(newValue);
  },
  {
    deep: true,
    immediate: true,
  }
);

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

const deleteItem = (itemArray, itemToDelete) => {
  let itemIndex = itemArray.findIndex((item) => item.id === itemToDelete.id);
  itemArray.splice(itemIndex, 1);
};

provide("deleteItem", deleteItem);
</script>

<template>
  <main class="relative">
    <NavBar></NavBar>
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.path" />
    </router-view>
  </main>
</template>

<style></style>
