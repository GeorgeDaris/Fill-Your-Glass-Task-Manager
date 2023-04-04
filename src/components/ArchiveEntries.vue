<script setup>
import { inject, computed } from "vue";
import ArchiveEntry from "./ArchiveEntry.vue";

const archive = inject("archive");

const reversedArchive = computed(() => {
  return archive.slice().reverse();
});
</script>

<template>
  <ul class="mx-4">
    <li class="group" v-for="entry in reversedArchive" :key="entry.id">
      <ArchiveEntry :entry="entry"></ArchiveEntry>
      <!-- <div v-for="task in entry.tasks" :key="task.id">
        <div v-if="task.category == 'Personal'">
          {{ task.title }}
        </div>
      </div> -->
      <!-- {{ entry }} -->
      <!-- <hr
        class="bg-lightGrey dark:bg-lightDark w-3/4 h-[0.15rem] border-none rounded-full my-1 mt-2 mx-auto group-last:hidden group-even:bg-hrOdd dark:group-even:bg-hrDarkOdd"
      /> -->
    </li>
  </ul>
</template>
<!-- shadow-[1.5rem_0.5rem_0px_0px_var(--accent)] -->
