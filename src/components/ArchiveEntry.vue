<script setup>
import { computed } from "vue";
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

const leadingZero = computed(() => {
  if (props.entry.date.day < 10) {
    return "0";
  } else {
    return false;
  }
});
</script>

<template>
  <transition name="todos" appear>
    <div
      class="md:grid md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10 my-4"
    >
      <div class="md:ml-4 font-semibold sticky top-12">
        <p
          class="sticky top-8 md:w-24 md:h-24 text-center md:flex items-center md:justify-center border-2 border-lightGrey rounded-md dark:border-lightDark"
        >
          <time class="flex md:block after:content-[''] after:flex-1">
            <span
              class="uppercase flex-1 text-left after:content-['\00a0\00a0'] md:after:content-['']"
              >{{ entry.date.month }}
            </span>

            <span class="md:block">
              <span v-if="leadingZero">
                {{ leadingZero }}{{ entry.date.day }}
              </span>
              <span v-else>
                {{ entry.date.day }}
              </span>
            </span>

            <!-- <span class="flex-1 text-left"></span> -->
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
        <div
          class="notes my-2 indent-4 text-justify"
          v-html="entry.notes"
        ></div>

        <h3 class="my-1 text-lg">Tasks</h3>
        <ul class="m-1 ml-4">
          <li v-for="task in entry.tasks" :key="task.id">
            <TodoItem :todo="task" />
          </li>
        </ul>
        <!-- <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          mattis orci. Pellentesque a sapien scelerisque, maximus diam ac,
          efficitur odio. Pellentesque pretium consequat iaculis. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Aenean a semper libero.
        </blockquote> -->
      </article>
    </div>
  </transition>
</template>

<style>
.notes p:first-of-type {
  text-indent: 0;
}
</style>
