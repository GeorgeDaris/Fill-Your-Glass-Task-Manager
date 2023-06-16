<script setup>
import {
  reactive,
  ref,
  inject,
  onBeforeMount,
  defineAsyncComponent,
} from "vue";

//importing the entry component asynchronously to improve page load time
const ArchiveEntry = defineAsyncComponent(() => import("./ArchiveEntry.vue"));

const props = defineProps(["todos"]);
const emit = defineEmits(["close-form"]);

//accessing all the completed todos which haven't been archived yet
const allTodos = ref(props.todos);
const tasksToArchive = allTodos.value.filter(
  (item) => item.completed && !item.archived
);

let date = ref();
//creating a sample date using the user's current one as the default date of the date picker.
date.value = new Date().toISOString().substring(0, 10);

let convertedDate = ref();
//converting back the user's date in order to pick it apart for all the data we need (month, year, etc)
convertedDate.value = new Date(date.value);

let warn = ref(false);

const convertDate = () => {
  const date1 = new Date(date.value);
  // specifying how we want to display the date
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
    //closing the form
    handleClickedOutside();
  } else {
    warn.value = true;
    input.value.focus();
  }
};

//to enable animations for when the entry component gets removed
const editorOpen = ref(true);

const handleClickedOutside = async () => {
  editorOpen.value = false;
  //using a timeout to allow for the entry to close
  setTimeout(() => emit("close-form"), 100);
};
</script>

<template>
  <form
    v-click-outside="handleClickedOutside"
    @keyup.esc="$emit('close-form')"
    class="archive-form relativeNot flex flex-col justify-between border-[0.2rem] rounded-md NOTrounded-t-none p-1 border-accentColor w-64 lg:w-80 h-[70vh] hNOT-[27rem] max-h-[32rem] overflow-auto bg-bgColor max-[740px]:w-full dark:bg-darkBg absolute -bottom-10 z-[4] NOTtop-[4.1rem] scroll-container shadow-[0.3rem_0.3rem_0px_0px_#ffffff,0.4rem_0.4rem_0px_0px_#7DDECD] dark:shadow-[0.3rem_0.3rem_0px_0px_#1d212a,0.4rem_0.4rem_0px_0px_#7DDECD]"
    autocomplete="off"
    ref="form"
  >
    <label for="title" class="m-1 flex flex-col">
      Title
      <input
        class="title-input border-[0.1rem] rounded-md p-1 m-1 ml-0 border-accentColor bg-inherit transition-all duration-100 hover:border-accentLight"
        placeholder="E.g Finished my essay"
        name="title"
        id="title"
        type="text"
        v-model.trim="newEntry.title"
        ref="input"
        v-focus
      />
    </label>
    <span v-if="warn" class="m-1"> Please add a title first </span>

    <label class="m-1 flex flex-col" for="notes">
      Notes
      <textarea
        class="flex-shrink-0 border-[0.1rem] rounded-md p-1 border-accentColor bg-inherit m-1 ml-0 resize-none scroll-container"
        placeholder=""
        name="notes"
        id="notes"
        v-model.trim="newEntry.notes"
      ></textarea>
    </label>
    <div class="flex flex-col">
      <p class="m-1">Tasks</p>
      <ul class="m-1 max-h-12 overflow-auto scroll-container">
        <li
          class="list-disc list-inside marker:text-accentColor"
          v-for="todo in tasksToArchive"
          :key="todo.id"
        >
          {{ todo.title }}
        </li>
      </ul>
    </div>

    <label class="m-1 flex flex-col" for="date" id="date">
      Date
      <input
        class="border-[0.1rem] rounded-md p-1 border-accentColor over bg-inherit m-1 ml-0"
        placeholder=""
        name="date"
        id="date"
        type="date"
        v-model="date"
        @change="convertDate"
        ref="subTaskInput"
      />
    </label>
    <button
      class="p-1 m-1 bg-accentColor rounded-md hover:bg-accentLight text-bgColor dark:text-darkBg"
      @click.enter.prevent="sendEntry(newEntry)"
    >
      Archive entry
    </button>
    <!-- Using the entry component to preview the parsed markdown -->
    <Teleport to=".progress-section">
      <Transition name="todos">
        <ArchiveEntry
          :entry="newEntry"
          v-if="editorOpen"
          :editor="true"
          class="hidden md:block absolute mtNOT-[0.9rem] mt-[2rem] md:mr-4 w-80 h-[68vh] max-h-[32rem] hNOT-[27rem]"
        />
      </Transition>
    </Teleport>
  </form>
</template>
