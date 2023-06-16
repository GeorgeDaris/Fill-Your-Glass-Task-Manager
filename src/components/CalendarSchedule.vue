<script setup>
import { inject, ref, reactive, watch } from "vue";

import CalendarElement from "./CalendarElement.vue";
import AddTodo from "./AddTodo.vue";
import TodoListNew from "./TodoListNew.vue";

import { useFormatDate } from "../composables/formatDate";
import { useDateEnding } from "../composables/dateEnding";

const scheduledTodos = inject("scheduledTodos");
const addTodo = inject("addScheduledTodo");

const categories = inject("categories");
const addCategory = inject("addCategory");

let selectedDate = ref(new Date());
let formattedDate = ref(useFormatDate(selectedDate.value));
let dateEnding = useDateEnding(formattedDate.value.day);

const changeDate = (date) => {
  selectedDate.value = new Date(date);
  formattedDate.value = useFormatDate(selectedDate.value);
  dateEnding = useDateEnding(formattedDate.value.day);
  getTasksForCurrentDate();
  console.log(date);
  console.log(selectedDate.value);
  console.log(dateTimeString());
};

const dateTimeString = () => {
  // const offset = selectedDate.value.getTimezoneOffset();
  // selectedDate.value = new Date(
  //   selectedDate.value.getTime() - offset * 60 * 1000
  // );
  //The timezone offset is messing with the dates
  return selectedDate.value.toISOString().split("T")[0];
};

let dateTasks = reactive([]);
const getTasksForCurrentDate = () => {
  dateTasks.length = 0;
  scheduledTodos.forEach((task) => {
    // let amount = 0;
    if (task.date == dateTimeString()) {
      dateTasks.push(task);
      //   amount++;
      console.log("Scheduled task");
    }
    //  else if (amount == 0) {
    //   dateTasks.length = 0;
    // }
  });
};
getTasksForCurrentDate();

//Watching scheduledTodos for changes to remove the item once it gets deleted
watch(scheduledTodos, async () => {
  getTasksForCurrentDate();
});

const sendTodo = (task, date) => {
  addTodo(task, date);
  getTasksForCurrentDate();
  console.log(date);
  console.log(dateTimeString());
};
</script>

<template>
  <div class="grid relative mx-4 md:ml-16 gap-10 md:grid-cols-[2fr_1fr]">
    <transition name="todos" appear>
      <CalendarElement
        @change-date="(date) => changeDate(date)"
      ></CalendarElement>
    </transition>
    <section>
      <AddTodo
        @add-todo="(task) => sendTodo(task, dateTimeString())"
        @add-category="addCategory"
        :categories="categories"
      >
        <span class="text-lg lg:text-xl block">
          Tasks for
          <Transition name="list" appear>
            <span :key="formattedDate.day">
              {{ formattedDate.weekday }}, {{ formattedDate.month }}
              {{ formattedDate.day }}<sup>{{ dateEnding }}</sup>
            </span>
          </Transition>
        </span>
      </AddTodo>
      <TodoListNew :todos="dateTasks" :in-calendar="true" class="mt-4">
      </TodoListNew>
    </section>
  </div>
</template>
