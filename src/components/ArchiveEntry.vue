<script setup>
// import { computed } from "vue";
import TodoItem from "./TodoItem.vue";

const props = defineProps(["entry"]);

const dateEnding = (date) => {
  if (date > 3 && date < 21) return "th";

  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
</script>

<template>
  <div>
    <p>
      <time>
        <span>{{ entry.date.month }} </span>
        <span>
          {{ entry.date.day }}<sup>{{ dateEnding(entry.date.day) }}</sup></span
        >
      </time>
    </p>

    <article>
      <header>
        <h2>{{ entry.title }}</h2>
      </header>
      <!-- <p>
        <time>
          <span>{{ entry.date.month }} </span>
          <span>
            {{ entry.date.day
            }}<sup>{{ dateEnding(entry.date.day) }}</sup></span
          >
        </time>
      </p> -->
      <p>
        {{ entry.notes }}
      </p>

      <h3>Tasks</h3>
      <ul>
        <li v-for="task in entry.tasks" :key="task.id">
          <TodoItem :todo="task" />
        </li>
      </ul>
    </article>
  </div>
</template>
