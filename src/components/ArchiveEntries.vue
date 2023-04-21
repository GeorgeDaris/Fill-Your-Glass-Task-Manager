<script setup>
import { inject, computed, reactive, ref } from "vue";
//
import ArchiveEntry from "./ArchiveEntry.vue";
import FilterOptionsVue from "./FilterOptions.vue";
import DateIcon from "./DateIcon.vue";

const archive = inject("archive");

// const reversedArchive = computed(() => {
//   return archive.slice().reverse();
// });

let archiveDates = reactive([
  // {
  //   id: "",
  //   date: {
  //     year: "",
  //     month: "",
  //     day: "",
  //     weekday: "",
  //     hour: "",
  //     minutes: "",
  //     entries: [
  //       {
  //         id: "",
  //         title: "",
  //         notes: "",
  //         tasks: [],
  //       },
  //     ],
  //   },
  // },
]);

archive.forEach((entry) => {
  // adding the main information: the date
  archiveDates.push({
    id: Math.floor(Date.now() * Math.random()),
    date: {
      year: entry.date.year,
      month: entry.date.month,
      day: entry.date.day,
    },
    entries: [],
  });

  // ,
  //   weekday: entry.date.weekday,
  //   hour: entry.date.hour,
  //   minutes: entry.date.minutes,

  archiveDates.forEach((date) => {
    //Now that we have new date entries, we can loop through them alongside our entries and check whether they have the same date.
    //This allows us to get all the entries based on their date, and group them together
    if (
      entry.date.year === date.date.year &&
      entry.date.month === date.date.month &&
      entry.date.day === date.date.day
    ) {
      date.entries.push({ entry });
      // date.push(entry);
      // console.log(date);
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
  // let withDuplicates = archiveDates.slice().reverse();
  // let unique = [...new Set(withDuplicates)];
  // archiveDates.forEach((date, index) => {
  //   archiveDates.forEach((otherDate, otherIndex) => {
  //     if (
  //       date.date.year === otherDate.date.year &&
  //       date.date.month === otherDate.date.month &&
  //       date.date.day === otherDate.date.day &&
  //       index !== otherIndex
  //     ) {
  //       archiveDates.splice(index, 1);
  //     }
  //   });
  // });

  removeDuplicates();
  let reversed = archiveDates.slice().reverse();
  reversed.forEach((date) => {
    date.entries = date.entries.slice().reverse();
    console.log(date.entries.slice().reverse());
  });
  // console.log(archiveDates);
  return reversed;
});

const archiveByDates = computed(() => {
  removeDuplicates();

  let regularArchive = archiveDates;
  regularArchive.forEach((date) => {
    date.entries = date.entries.slice().reverse();
    console.log(date.entries.slice().reverse());
  });
  // console.log(archiveDates);
  return regularArchive;
});

let filterBy = ref("Most recent");
// filterBy.value = reversedArchiveByDates;

const filterEntries = (option) => {
  console.log("event emitted", option);
  filterBy.value = option;
  // if (option === "Most recent") {
  //   filterBy.value = reversedArchiveByDates;
  //   console.log("recent");
  // } else if (option === "Oldest") {
  //   filterBy.value = archiveByDates;
  // }
};

// const entryDates = computed(() => {
//   let dates = [];
//   reversedArchive.value.forEach((entry) => {
//     dates.push(entry.date);
//   });
//   return dates;
// });

// let entriesByDate = reactive([]);

// const populateEntries = () => {
//   let allDates = [];
//   reversedArchive.value.forEach((entry) => {
//     allDates.push({
//       month: entry.date.month,
//       date: entry.date.day,
//       year: entry.date.year,
//     });
//   });
//   entriesByDate = [...new Set(allDates)];
// };

// populateEntries();
</script>

<template>
  <!-- <pre> -->
  <!-- {{ archiveDates }} -->
  <!-- {{reversedArchiveByDates}} -->
  <!-- </pre> -->
  <FilterOptionsVue @filter="filterEntries"></FilterOptionsVue>
  <ul class="mx-4">
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
    <template v-else>
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
    <!-- <li class="group" v-for="entry in reversedArchive" :key="entry.id"> -->
    <!-- <div>{{ entry.date }}</div>
      <div v-for="entry in date.entries" :key="entry.id"> -->
    <!-- <ArchiveEntry :entry="entry"></ArchiveEntry> -->
    <!-- </div> -->

    <!-- <div v-for="date in entryDates" :key="date.minutes">
        <div v-if="date.day === entry.date.day">
          {{ date.month }} {{ date.day }}
        </div>
      </div> -->
    <!-- <div v-for="task in entry.tasks" :key="task.id">
        <div v-if="task.category == 'Personal'">
          {{ task.title }}
        </div>
      </div> -->
    <!-- {{ entry }} -->
    <!-- <hr
        class="bg-lightGrey dark:bg-lightDark w-3/4 h-[0.15rem] border-none rounded-full my-1 mt-2 mx-auto group-last:hidden group-even:bg-hrOdd dark:group-even:bg-hrDarkOdd"
      /> -->
    <!-- </li> -->
  </ul>
</template>
<!-- shadow-[1.5rem_0.5rem_0px_0px_var(--accent)] -->
