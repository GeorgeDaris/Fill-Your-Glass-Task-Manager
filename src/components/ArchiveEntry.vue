<script setup>
import { computed } from "vue";

import TodoItem from "./TodoItem.vue";
import EditButtons from "./EditButtons.vue";
import { useMonthToNumber } from "../composables/monthToNumber";
import { useDateEnding } from "../composables/dateEnding";
// import { useDateTimeString } from "../composables/dateTimeString";

import { marked } from "marked";
import "highlight.js/styles/base16/nord.css";

const props = defineProps(["entry", "editor"]);

//to create the "th" etc. ending of ordinal numbers
const dateEnding = useDateEnding(props.entry.date.day);

const dateTimeString = computed(() => {
  // converting the month to a number and padding it with a zero if needed
  let month = useMonthToNumber(props.entry.date.month);
  if (month < 10) {
    month = "0" + String(month);
  }
  // formatting the date properly for the date-time attribute of the time element
  return `${props.entry.date.year}-${month}-${props.entry.date.day}`;
});

// const dateTimeString = useDateTimeString(
//   props.entry.date.year,
//   props.entry.date.month,
//   props.entry.date.day
// );

//parsing the entry's notes with the marked.js library to turn them into html
const markdownOutput = computed(() => marked(props.entry.notes));

const copyEntryAsMD = () => {
  let title = `# ${props.entry.title}`;
  let date = `*${props.entry.date.weekday}, ${props.entry.date.month} ${
    props.entry.date.day
  }<sup>${useDateEnding(props.entry.date.day)}</sup>, ${
    props.entry.date.year
  }*`;
  let tasks = "";
  props.entry.tasks.forEach((task) => {
    let taskTitle = `- [x] **${task.title}**`;
    let taskDescription = "";
    let taskCategory = "";
    let taskSubTasks = [];

    if (task.description) {
      taskDescription = `    Description: ${task.description}`;
    }
    if (task.category) {
      taskCategory = `    Category: ${task.category}`;
    }

    task.subTasks.forEach((subTask) => {
      taskSubTasks += `- - [x] ${subTask.title}

`;
    });

    //adding new tasks without overriding previous one. An array wasn't used as it can't get iterated through in string literals
    tasks += `${taskTitle}

${taskDescription}

${taskCategory}

${taskSubTasks}

`;

    //composing the entry:
    let entry = `${title}

${date}

${props.entry.notes}

## Tasks:

${tasks}

`;
    //writing it to the clipboard
    navigator.clipboard.writeText(entry);
  });
};
</script>

<template>
  <transition name="todos" appear>
    <section
      class="max-w-xl mt-8 m-1 md:ml-4 p-4 md:col-start-2 bg-bgColor border-[1px] border-lightGrey rounded-md shadow-[0rem_0.1rem_1px_0rem_#dcddde,_0rem_0.7rem_0px_-0.3rem_#f9fafa,_0rem_0.7rem_2px_-0.3rem_#dcddde,_0rem_1.3rem_0px_-0.5rem_#f8f8f8,_0rem_1.3rem_2px_-0.5rem_#dcddde,_0rem_1.9rem_0px_-0.8rem_#f4f5f5,_0rem_1.9rem_2px_-0.8rem_#dcddde] dark:border-lightDark dark:bg-darkBg dark:shadow-[0rem_0.1rem_1px_0rem_#13151b,_0rem_0.7rem_0px_-0.3rem_#1a1d25,_0rem_0.7rem_2px_-0.3rem_#13151b,_0rem_1.3rem_0px_-0.5rem_#171a21,_0rem_1.3rem_2px_-0.5rem_#13151b,_0rem_1.9rem_0px_-0.8rem_#181921,_0rem_1.9rem_2px_-0.8rem_#13151b] font-raleway text-[1.02rem]"
      :class="editor ? 'overflow-hidden' : ''"
    >
      <!-- <p
        v-if="editor"
        style="writing-mode: vertical-lr"
        class="float-left -ml-10 mt-80 rotate-180 text-sm"
      >
        PREVIEW
      </p> -->
      <h2 class="visually-hidden">Entry</h2>
      <article class="relative">
        <EditButtons
          v-if="!editor"
          :item-array="'archive'"
          :item="entry"
          class="-top-2 -right-3"
        >
          <button
            @click="copyEntryAsMD"
            class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
            title="Copy entry as markdown"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 68 87"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="stroke-textColor dark:stroke-darkText"
                y="10"
                width="68"
                height="77"
                rx="4"
                stroke="black"
                stroke-width="14"
                mask="url(#path-1-inside-1_597_144)"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText"
                x="14.75"
                y="29.75"
                width="39.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="black"
                stroke-width="1.5"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText"
                x="14.75"
                y="38.75"
                width="39.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="black"
                stroke-width="1.5"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText"
                x="14.75"
                y="47.75"
                width="39.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="black"
                stroke-width="1.5"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText"
                x="14.75"
                y="56.75"
                width="39.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="black"
                stroke-width="1.5"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText"
                x="14.75"
                y="65.75"
                width="39.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="black"
                stroke-width="1.5"
              />
              <path
                class="fill-textColor dark:fill-darkText"
                d="M16 12C16 9.23858 18.2386 7 21 7H48C50.7614 7 53 9.23858 53 12V21H16V12Z"
                fill="black"
              />
              <path
                class="stroke-textColor dark:stroke-darkText"
                d="M16 12C16 9.23858 18.2386 7 21 7H48C50.7614 7 53 9.23858 53 12V21H16V12Z"
                stroke="black"
              />
              <rect
                class="stroke-textColor dark:stroke-darkText fill-bgColor dark:fill-darkBg"
                x="30"
                y="2"
                width="9"
                height="9"
                rx="4.5"
                fill="white"
                stroke="black"
                stroke-width="4"
              />
            </svg>
          </button>
        </EditButtons>
        <header>
          <h2
            class="text-xl font-semibold underline underline-offset-4 decoration-accentColor decoration-[0.2rem] tracking-wide font-raleway"
          >
            {{ entry.title }}
          </h2>
        </header>
        <p class="text-right">
          <time class="italic" :datetime="dateTimeString">
            {{ entry.date.weekday }}, {{ entry.date.month }} {{ entry.date.day
            }}<sup>{{ dateEnding }}</sup> {{ entry.date.year }}
          </time>
        </p>
        <!-- creating a scroll container when used as a preview while adding a new entry -->
        <div
          class="my-2"
          :class="[
            editor
              ? ['scroll-container', 'overflow-y-auto', 'h-[45vh]', 'mask']
              : 'not',
          ]"
        >
          <div
            class="notes indent-4 text-justify mx-4 break-words"
            v-html="markdownOutput"
          ></div>

          <h3 class="my-1 text-lg">Tasks:</h3>
          <ul class="m-1 ml-n8 archive-tasks">
            <li
              v-for="task in entry.tasks"
              :key="task.id"
              class="my-2 font-inter group"
            >
              <TodoItem :todo="task" :inArchive="true" />
              <hr
                class="bg-lightGrey dark:bg-lightDark h-[0.15rem] border-none rounded-full my-1 mt-2 group-last:hidden group-even:bg-hrOdd dark:group-even:bg-hrDarkOdd"
              />
            </li>
          </ul>
        </div>
      </article>
    </section>
  </transition>
</template>

<style></style>
