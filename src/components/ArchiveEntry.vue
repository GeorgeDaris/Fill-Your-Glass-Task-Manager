<script setup>
// import { computed } from "vue";
import TodoItem from "./TodoItem.vue";

// const props =
defineProps(["entry"]);

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
  <div
    class="grid md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10"
  >
    <div class="ml-4 font-semibold">
      <p
        class="sticky top-8 w-24 h-24 text-center flex items-center justify-center border-2 border-lightGrey rounded-md dark:border-lightDark"
      >
        <time>
          <span>{{ entry.date.month }} </span>
          <span class="block">
            {{ entry.date.day
            }}<sup>{{ dateEnding(entry.date.day) }}</sup></span
          >
        </time>
      </p>
    </div>

    <article class="max-w-xl mt-8 m-1">
      <header>
        <h2 class="text-xl font-semibold">{{ entry.title }}</h2>
      </header>
      <p class="text-right">
        <time class="italic">
          {{ entry.date.weekday }}, {{ entry.date.month }} {{ entry.date.day
          }}<sup>{{ dateEnding(entry.date.day) }}</sup
          >, {{ entry.date.year }}
        </time>
      </p>
      <p class="notes my-2 indent-4 text-justify" v-html="entry.notes"></p>

      <h3 class="my-1 text-lg">Tasks</h3>
      <ul class="m-1 ml-4">
        <li v-for="task in entry.tasks" :key="task.id">
          <TodoItem :todo="task" />
        </li>
      </ul>
      <!-- <blockquote>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        mattis orci. Pellentesque a sapien scelerisque, maximus diam ac,
        efficitur odio. Pellentesque pretium consequat iaculis. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Aenean a semper libero.
      </blockquote> -->
    </article>
  </div>
</template>

<style>
.notes p:first-of-type {
  text-indent: 0;
}
</style>
