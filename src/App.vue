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
      id: 0,
      title: "Welcome the user",
      description:
        "Welcome to Fill Your Cup! A task manager complete with markdown supported notes and a calendar.",
      completed: true,
      archived: false,
    },
    {
      id: 1,
      title: "Create a task management app.",
      description: "Use Vue 3 and Tailwind CSS",
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
          completed: true,
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
  archive = reactive([
    {
      id: "401458106445",
      title: "Link Preview Implementation",
      notes:
        'After having spent some time researching this topic, I finally began working on this feature for the archive.\n\nWikipedia\'s use of [page previews](https://diff.wikimedia.org/2018/04/20/why-it-took-a-long-time-to-build-that-tiny-link-preview-on-wikipedia/) is what inspired me to implement it, as I found it could help users navigate links they\'ve added using markdown. It was also something I had been meaning to create for a while, so I felt it could make for another coding challenge.\n\n---\n\nThere are many ways to build this feature, one of which would require scraping the specified website to format it to keep the design consistent. This didn\'t seem like the best approach in my case, so I relied on a simple iframe to render the site.\n\n## Implementation\n\nI created a reusable composable which takes a container element as a parameter to store all the links inside it. This prevents all the site\'s links from being used, such as those used for navigation which don\'t need a preview.\n\n```js\n//creates an iFrame next to links that are inside a specified parent element when the user hovers over them.\nexport function useLinkPreview(parentElement) {\n  const container = document.getElementsByClassName(parentElement);\n  const links = container[0].getElementsByTagName("a");\n```\n\nAfter that we create a `showLinkPreview` function to display the iframe for each link:\n\n```js\nArray.from(links).forEach((link) => {\n    let preview = null;\n    const showLinkPreview = () => {\n      link.classList.add("relative");\n      preview = document.createElement("iframe");\n      preview.src = link.href;\n      //making it ufocusable to allow for better navigation for keyboard users\n      preview.tabIndex = "-1";\n      preview.classList.add(\n        "absolute",\n        "z-[100]",\n        "border-[1px]",\n        "rounded-md",\n        "bg-bgColor",\n        "border-lightGrey",\n        "dark:bg-darkBg",\n        "dark:border-lightDark",\n        "md:h-80",\n        "md:w-96",\n        "transition-all",\n        "duration-700",\n        "opacity-0",\n        "mt-12"\n      );\n\n      //removes the previously created iframe in case the user hovers over and away from the link too quickly\n      let sibling = link.nextElementSibling;\n      if (sibling && sibling.nodeName == "IFRAME") {\n        console.log("This is an iframe");\n        sibling.remove();\n      }\n      link.after(preview);\n\n      //creating the fade-in animation\n      setTimeout(() => {\n        preview.classList.add("opacity-100", "mt-4");\n      }, 300);\n    };\n```\n\nAn iframe is created with the link\'s href as the the source. To allow for transitions to play we set a `setTimeout` function with a short delay to add the desired classes.\n\nTo make it accessible we call the function on the link for both `mouseover` and `focus` events to account for keyboard users:\n\n```js\nlink.addEventListener("mouseover", () => {\n      showLinkPreview();\n    });\n\n    link.addEventListener("focus", () => {\n      showLinkPreview();\n    });\n```\n\nIn order to remove the preview once the user focuses out of the link or moves their mouse outside the link or preview, we create a `closePreview` function and call it on the `mouseleave` and `blur` events:\n\n```js\nconst closePreview = () => {\n      preview.classList.remove("opacity-100", "mt-4");\n      setTimeout(() => {\n        preview.remove();\n      }, 300);\n\n      //remove the event listener\n      document.body.removeEventListener("mouseover", closePreview, false);\n    };\n\n    link.addEventListener("mouseleave", () => {\n      document.body.addEventListener("mouseover", (e) => {\n        if (e.target !== link && e.target.contains(link)) {\n          closePreview();\n        }\n      });\n    });\n\n    link.addEventListener("blur", () => {\n      closePreview();\n    });\n```\n\nIt is important to remove the event listener from the body, as it will otherwise continue to fire and prevent the preview from opening again.\n\nI also encountered a bug where the preview would get stuck after hovering over and out of the link too quickly. To prevent this behavior an if statement was used to check whether the link\'s sibling element is an iframe, in which case it gets removed before adding the new one.\n\n```js\n//removes the previously created iframe in case the user hovers over and away from the link too quickly\n      let sibling = link.nextElementSibling;\n      if (sibling && sibling.nodeName == "IFRAME") {\n        console.log("This is an iframe");\n        sibling.remove();\n      }\n      link.after(preview);\n```\n\n## Preview\n\n![](https://cdn.discordapp.com/attachments/778277376386662451/1103260962594750464/ezgif.com-video-to-gif.gif)',
      tasks: [
        {
          id: 775394401633,
          title: "Create link previews",
          description:
            "Similar to the feature found on Wikipedia when the user hovers over a link.",
          category: "Testing",
          archived: true,
          subTasks: [
            { title: "Create the iframe", completed: true },
            { title: "Style it", completed: true },
            { title: "Add transitions", completed: true },
            { title: "Make it accessible with focus / blur", completed: true },
            {
              title:
                "Fix a bug where the iframe remains after the user has hovered over it too often",
              completed: true,
            },
          ],
          completed: true,
        },
      ],
      date: {
        year: "2023",
        month: "May",
        day: "3",
        weekday: "Wednesday",
        hour: 13,
        minutes: 28,
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
