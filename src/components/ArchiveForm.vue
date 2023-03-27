<script setup>
import { reactive, ref, inject, onBeforeMount } from "vue";

const props = defineProps(["todos"]);
const emit = defineEmits(["close-form"]);

const allTodos = ref(props.todos);
const tasksToArchive = allTodos.value.filter(
  (item) => item.completed && !item.archived
); //accessing all the completed todos which haven't been archived yet

let date = ref();
//creating a sample date using the user's current one as the default date of the date picker.
date.value = new Date().toISOString().substr(0, 10);

let convertedDate = ref();
//converting back the user's date in order to pick it apart for all the data we need (month, year, etc)
convertedDate.value = new Date(date.value);

// let formIsOpen = ref(true);
let warn = ref(false);

const convertDate = () => {
  const date1 = new Date(date.value);
  // specifying how we wan to display the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  //dividing it into parts
  const parts = dateTimeFormat.formatToParts(date1);
  const partValues = parts.map((p) => p.value);
  console.log(partValues);

  newEntry.date.weekday = partValues[0];
  newEntry.date.month = partValues[2];
  newEntry.date.day = partValues[4];
  newEntry.date.year = partValues[6];
  let newTime = new Date();
  newEntry.date.hour = newTime.getHours();
  newEntry.date.minutes = newTime.getMinutes();
};

onBeforeMount(() => {
  convertDate();
});

let newEntry = reactive({
  id: `${Math.floor(Date.now() * Math.random())}`,
  title: "",
  notes: "",
  tasks: tasksToArchive,
  date: {
    year: "",
    month: "",
    day: "",
    weekday: "",
    hour: "",
    minutes: "",
  },
});

const addArchiveEntry = inject("addArchiveEntry");
const updateTodo = inject("updateTodo");
const input = ref(null);

const sendEntry = (entry) => {
  if (newEntry.title) {
    addArchiveEntry(entry);
    newEntry = {
      id: `${Math.floor(Date.now() * Math.random())}`,
      title: "",
      notes: "",
      tasks: tasksToArchive,
      date: {
        year: "",
        month: "",
        day: "",
        weekday: "",
        hour: "",
        minutes: "",
      },
    };

    //marking archived todos that are still in the list
    tasksToArchive.forEach((todo) => {
      updateTodo(todo.id, undefined, undefined, true);
    });
    emit("close-form");
  } else {
    warn.value = true;
    input.value.focus();
  }
};

// let body = document.querySelector("body");
// let button = document.querySelector(".archive-button");
// // let form = ref(null);
// let form = document.querySelector(".archive-form");

// onMounted(() => {
//   // let clicksOutside = ref(0);
//   const closeForm = () => {
//     let formDescendants = Array.from(form.querySelectorAll("*"));
//     body.addEventListener("click", (e) => {
//       e.stopImmediatePropagation();
//       if (form !== e.target) {
//         formDescendants.forEach((element) => {
//           if (e.target === element || e.target === button) {
//             return;
//           } else {
//             console.log("FIRE!");
//             // console.log(clicksOutside.value);
//             // if (clicksOutside.value > 1) {
//             emit("close-form");
//             // clicksOutside.value = 0;
//             // } else {
//             //   clicksOutside.value++;
//             // }
//           }
//         });
//       }
//     });
//   };

//   setTimeout(closeForm(), 0);
// });

const vFocus = {
  mounted: (el) => el.focus(),
};

// let clicks = ref(0);

// const close = () => {
//   console.log("v- function");
//   emit("close-form");
// };
const handleClickedOutside = async () => {
  // setTimeout(close(), 0);

  console.log("v- function");
  emit("close-form");

  // await nextTick();
  // setTimeout(close(), 0);

  // formIsOpen.value = false;
  // let clicks = ref(1);
  // console.log("this works");
  // console.log(clicks.value);
  // if (clicks.value >= 1) {
  //   clicks.value = 0;
  //   console.log(clicks.value);

  // formIsOpen.value = false;
  // return;
  // } else {
  //   clicks.value++;
  // formIsOpen.value = true;
  // }
};

const vClickOutside = {
  mounted(el, binding) {
    el.__ClickOutsideHandler__ = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    setTimeout(
      () => document.body.addEventListener("click", el.__ClickOutsideHandler__),
      0
    );
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.__ClickOutsideHandler__);
  },
};
</script>

<template>
  <!-- <pre v-click-outside="handleClickedOutside">
    {{ newEntry }}
  </pre> -->
  <!-- v-if="formIsOpen" -->
  <!-- v-click-outside="$emit('close-form')" -->
  <form
    v-click-outside="handleClickedOutside"
    @keyup.esc="$emit('close-form')"
    class="archive-form relativeNot flex flex-col justify-between border-[0.2rem] rounded-md NOTrounded-t-none p-1 border-accentColor w-64 lg:w-80 h-[27rem] overflow-auto bg-bgColor max-[740px]:w-full dark:bg-darkBg absolute bottom-0 z-[4] NOTtop-[4.1rem] scroll-container shadow-[0.3rem_0.3rem_0px_0px_#ffffff,0.4rem_0.4rem_0px_0px_#7DDECD] dark:shadow-[0.3rem_0.3rem_0px_0px_#1d212a,0.4rem_0.4rem_0px_0px_#7DDECD]"
    autocomplete="off"
    ref="form"
  >
    <label for="title" class="m-1"> Title </label>
    <input
      class="title-input border-[0.1rem] rounded-md p-1 m-1 border-accentColor bg-inherit transition-all duration-100 hover:border-accentLight"
      placeholder="E.g Finished my essay"
      name="title"
      id="title"
      type="text"
      v-model.trim="newEntry.title"
      ref="input"
      v-focus
    />
    <!-- :class="{ activeForm: formIsOpen }" -->
    <span v-if="warn" class="m-1"> Please add a title first </span>

    <label class="m-1" for="notes"> Notes </label>
    <textarea
      class="flex-shrink-0 border-[0.1rem] rounded-md p-1 border-accentColor bg-inherit m-1 resize-none scroll-container"
      placeholder=""
      name="notes"
      id="notes"
      v-model.trim="newEntry.notes"
    ></textarea>
    <p class="m-1">Tasks</p>
    <ul class="m-1 max-h-20 overflow-auto scroll-container">
      <li
        class="list-disc list-inside marker:text-accentColor"
        v-for="todo in tasksToArchive"
        :key="todo.id"
      >
        {{ todo.title }}
      </li>
    </ul>
    <label class="m-1" for="date" id="date"> Date </label>
    <input
      class="border-[0.1rem] rounded-md p-1 border-accentColor over bg-inherit m-1"
      placeholder=""
      name="date"
      id="date"
      type="date"
      v-model="date"
      @change="convertDate"
      ref="subTaskInput"
    />
    <!-- :value="new Date().toISOString().substr(0, 10)" -->
    <!-- <button @click.prevent="formIsOpen = false">-</button> -->
    <button
      class="p-1 m-1 bg-accentColor rounded-md hover:bg-accentLight text-bgColor dark:text-darkBg"
      @click.enter.prevent="sendEntry(newEntry)"
    >
      Archive entry
    </button>
  </form>
</template>
