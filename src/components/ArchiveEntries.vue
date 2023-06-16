<script setup>
import { inject, computed, reactive, ref, onMounted } from "vue";

import ArchiveEntry from "./ArchiveEntry.vue";
import FilterOptionsVue from "./FilterOptions.vue";
import DateIcon from "./DateIcon.vue";

import { useLinkPreview } from "../composables/linkPreview";
import { useRemoveDuplicateBullets } from "../composables/removeDuplicateBullets";

const archive = inject("archive");
let archiveDates = reactive([]);

archive.forEach((entry) => {
  // adding the main information: the date
  // let month = useMonthToNumber(entry.date.month);

  archiveDates.push({
    id: Math.floor(Date.now() * Math.random()),
    // id: Date.parse(entry.date.day, month, entry.date.year),
    date: {
      year: entry.date.year,
      month: entry.date.month,
      day: entry.date.day,
    },
    entries: [],
  });

  archiveDates.forEach((date) => {
    //Now that we have new date entries, we can loop through them alongside our entries and check whether they have the same date.
    //This allows us to get all the entries based on their date, and group them together
    if (
      entry.date.year === date.date.year &&
      entry.date.month === date.date.month &&
      entry.date.day === date.date.day
    ) {
      date.entries.push({ entry });
    }
  });
});

const removeDuplicates = () => {
  for (let i = archiveDates.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (
        archiveDates[i].date.year === archiveDates[j].date.year &&
        archiveDates[i].date.month === archiveDates[j].date.month &&
        archiveDates[i].date.day === archiveDates[j].date.day
      ) {
        archiveDates.splice(i, 1);
        break;
      }
    }
  }
};

const reversedArchiveByDates = computed(() => {
  removeDuplicates();
  let reversed = archiveDates.slice().reverse();
  reversed.forEach((date) => {
    date.entries = date.entries.slice().reverse();
  });
  return reversed;
});

const archiveByDates = computed(() => {
  removeDuplicates();

  let regularArchive = archiveDates;
  regularArchive.forEach((date) => {
    date.entries = date.entries.slice().reverse();
  });
  return regularArchive;
});

let filterBy = ref("Most recent");
let categoryFilter = ref("");

const filterEntries = (option, category) => {
  filterBy.value = option;
  categoryFilter.value = category;
};

const checkCategory = (entryTasks) => {
  let show = false;
  entryTasks.forEach((task) => {
    if (task.category === categoryFilter.value) {
      show = true;
    }
  });
  return show;
};

// const amountOfEntries = computed(() => {
//   return `Showing ${archive.length} entries`;
// });

onMounted(() => {
  //added functionality for entries
  useLinkPreview("entries");
  useRemoveDuplicateBullets("notes");
});
</script>

<template>
  <!-- Using the filter component to run a function when the user selects their option -->
  <FilterOptionsVue @filter="filterEntries"></FilterOptionsVue>
  <!-- <p class="ml-4 md:ml-40 pl-2 my-4">
    {{ amountOfEntries }}
  </p> -->
  <ul class="mx-4 entries">
    <!-- Rendering a different template according to the filter to change the computed property for the archive -->
    <template v-if="filterBy === 'Most recent'">
      <li
        class="group grid grid-cols-1 md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10 my-4"
        v-for="date in reversedArchiveByDates"
        :key="date.id"
      >
        <DateIcon :date="date.date" class="mt-8"></DateIcon>
        <template v-for="entry in date.entries" :key="entry.id">
          <ArchiveEntry :entry="entry.entry"></ArchiveEntry>
        </template>
      </li>
    </template>
    <template v-else-if="filterBy === 'Oldest'">
      <li
        class="group grid grid-cols-1 md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10 my-4"
        v-for="date in archiveByDates"
        :key="date.id"
      >
        <DateIcon :date="date.date" class="mt-8"></DateIcon>
        <template v-for="entry in date.entries" :key="entry.id">
          <ArchiveEntry :entry="entry.entry"></ArchiveEntry>
        </template>
      </li>
    </template>
    <template v-else>
      <!-- BUG: List elements get printed anyway, causing big gaps in the layout -->
      <!-- Fixed through the use of the template tag -->
      <template v-for="date in reversedArchiveByDates" :key="date.id">
        <template v-for="entry in date.entries" :key="entry.id">
          <template v-if="checkCategory(entry.entry.tasks)">
            <li
              class="archive-item group grid grid-cols-1 md:grid-cols-[minmax(5rem,_0.5fr)_minmax(7rem,_5fr)] gap-x-10 my-4"
            >
              <DateIcon :date="date.date" class="mt-8"></DateIcon>
              <ArchiveEntry :entry="entry.entry"></ArchiveEntry>
            </li>
          </template>
        </template>
      </template>
    </template>
  </ul>
</template>
