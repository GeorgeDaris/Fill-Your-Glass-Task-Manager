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

const monthToNumber = (month) => {
  let monthNum;
  monthNum = new Date(Date.parse(month + "1, 2001")).getMonth() + 1;
  return monthNum;
};

const dateTimeString = computed(() => {
  let month = monthToNumber(props.entry.date.month);
  if (month < 10) {
    month = "0" + String(month);
  }
  return `${props.entry.date.year}-${month}-${props.entry.date.day}`;
});
</script>

<template>
  <transition name="todos" appear>
    <!-- class="md:grid md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10 my-4" -->
    <!-- <span class="flex-1 text-left"></span> -->
    <!-- <div> -->
    <section
      class="max-w-xl mt-8 m-1 md:ml-4 p-4 md:col-start-2 bg-bgColor border-[1px] border-lightGrey rounded-md shadow-[0rem_0.1rem_1px_0rem_#dcddde,_0rem_0.7rem_0px_-0.3rem_#f9fafa,_0rem_0.7rem_2px_-0.3rem_#dcddde,_0rem_1.3rem_0px_-0.5rem_#f8f8f8,_0rem_1.3rem_2px_-0.5rem_#dcddde,_0rem_1.9rem_0px_-0.8rem_#f4f5f5,_0rem_1.9rem_2px_-0.8rem_#dcddde] dark:border-lightDark dark:bg-darkBg dark:shadow-[0rem_0.1rem_1px_0rem_#13151b,_0rem_0.7rem_0px_-0.3rem_#1a1d25,_0rem_0.7rem_2px_-0.3rem_#13151b,_0rem_1.3rem_0px_-0.5rem_#171a21,_0rem_1.3rem_2px_-0.5rem_#13151b,_0rem_1.9rem_0px_-0.8rem_#181921,_0rem_1.9rem_2px_-0.8rem_#13151b] font-raleway text-[1.02rem]"
    >
      <article>
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
            }}<sup>{{ dateEnding(entry.date.day) }}</sup
            >, {{ entry.date.year }}
          </time>
        </p>
        <div
          class="notes my-2 indent-4 text-justify"
          v-html="entry.notes"
        ></div>

        <h3 class="my-1 text-lg">Tasks:</h3>
        <ul class="m-1 ml-n8">
          <li
            v-for="task in entry.tasks"
            :key="task.id"
            class="my-2 font-inter"
          >
            <TodoItem :todo="task" :inArchive="true" />
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
    </section>
    <!-- </div> -->
  </transition>
</template>

<style>
.notes p:first-of-type {
  text-indent: 0;
}
</style>
