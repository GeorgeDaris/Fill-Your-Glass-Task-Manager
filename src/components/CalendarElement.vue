<script setup>
import { ref, reactive, computed, watch, inject, onUpdated } from "vue";

import scheduledTasks from "./scheduledTasks.vue";

const emit = defineEmits(["change-date"]);

let today = ref(new Date());
// const actualDate = ref(new Date());

// "2023-09-11"
// 2023-05-11
// .toISOString().substring(0, 10)
// let currentDate = reactive({});

// const setCurrentDate = () => {
let currentDate = reactive({
  locale: document.documentElement.getAttribute("lang") || "en-US",
  today: {
    weekday: today.value.getDay(),
    month: today.value.getMonth(),
    day: today.value.getDate(),
    year: today.value.getFullYear(),
  },
});
// };

// setCurrentDate();

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const shortWeekdayNames = computed(() => {
  let short = [];
  weekdays.forEach((weekday) => {
    short.push(weekday.substring(0, 3));
  });
  return short;
});

// const week = new Intl.Locale("en-US").prototype.getWeekInfo();
// console.log(week);

const formattedDate = reactive({
  weekday: "",
  month: "",
  day: 0,
  year: 0,
});

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

const formatDate = () => {
  const parts = dateTimeFormat.formatToParts(today.value);
  const partValues = parts.map((p) => p.value);

  formattedDate.weekday = partValues[0];
  formattedDate.month = partValues[2];
  formattedDate.day = partValues[4];
  formattedDate.year = partValues[6];
};

formatDate();

const firstDayOfTheMonth = computed(() => {
  return new Date(currentDate.today.year, currentDate.today.month, 1).getDay();
});

//We can find how many days there are in a month by looking up the last day. First we give it the current year and the following month, and get the "0" day, which is the last one of the previous month
const lastDayOfTheMonth = computed(() => {
  return new Date(
    currentDate.today.year,
    currentDate.today.month + 1,
    0
  ).getDate();
});

const daysOfTheMonth = computed(() => {
  const days = [];
  for (let i = 1; i <= lastDayOfTheMonth.value; i++) {
    days.push(i);
  }
  return days;
});

const paddingDays = computed(() => {
  const padding = [];
  for (let i = 0; i < firstDayOfTheMonth.value; i++) {
    padding.push(i);
  }
  return padding;
});

const remainingDays = computed(() => {
  const days = [];
  const addRemainingDays = () => {
    let i = 35;
    if (daysOfTheMonth.value.length + paddingDays.value.length > 35) {
      i = 42;
    }
    for (i; i > daysOfTheMonth.value.length + paddingDays.value.length; i--) {
      days.push(i);
    }
  };
  addRemainingDays();
  return days;
});

watch(
  today,
  () => {
    const update = () => {
      currentDate.today.weekday = today.value.getDay();
      currentDate.today.month = today.value.getMonth();
      currentDate.today.day = today.value.getDate();
      currentDate.today.year = today.value.getFullYear();
      console.log("Today!!");
    };
    update();
  },
  {
    deep: true,
  }
);

// watch(
//   currentDate,
//   () => {
//     firstDayOfTheMonth.value,
//       lastDayOfTheMonth.value,
//       daysOfTheMonth.value,
//       paddingDays.value,
//       remainingDays.value,
//       console.log(currentDate.today);
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );

// 35 - daysOfTheMonth.length + paddingDays.length

// };
// getDays();

//creating a machine readable version of each date for the time element
const dateTime = (day) => {
  let month = String(currentDate.today.month + 1).padStart(2, "0");
  //padding the day as well, to prevent issues with how Chrome reads dates when converting them to ISO strings.
  let zeroPadded = String(day).padStart(2, "0");
  return `${currentDate.today.year}-${month}-${zeroPadded}`;
};

const isCurrentDate = (date) => {
  if (new Date().getDate() == date && month.value == new Date().getMonth()) {
    return true;
  }
};

let ogDate = ref(new Date());
let month = ref(new Date().getMonth());
let year = ref(new Date().getFullYear());

//setting a key for the dates so it doesn't change when the user clicks on a different one. This prevents the list transition from playing each time.
let dateKey = ref(25);

const previousMonth = () => {
  //Instead we change the key when the user changes months, where the transition is meant to be played
  dateKey.value = Math.random();
  if (month.value == 0) {
    month.value = 11; //December
    year.value--;
    ogDate.value.setFullYear(year.value);
  } else {
    month.value--;
  }
  ogDate.value.setMonth(month.value);
  //setting the date to "1" to prevent it from skipping months when the current date is higher than that of the others, like the 31st.
  if (
    ogDate.value.getMonth() === new Date().getMonth() &&
    ogDate.value.getFullYear() === new Date().getFullYear()
  ) {
    //setting it to the current date if it is the same as the user's
    ogDate.value.setDate(new Date().getDate());
  } else {
    ogDate.value.setDate(1);
  }
  //setting it to zero to cause the watch function to run. Before I was simply changing the month and year of the today variable's date object, which didn't qualify as a proper changing of the variable to trigger the watcher
  today.value = 0;
  today.value = ogDate.value;

  console.log(month.value);

  formatDate();
};

const nextMonth = () => {
  dateKey.value = Math.random();
  if (month.value == 11) {
    month.value = 0; //January
    year.value++;
    ogDate.value.setFullYear(year.value);
  } else {
    month.value++;
  }
  ogDate.value.setMonth(month.value);
  if (
    ogDate.value.getMonth() === new Date().getMonth() &&
    ogDate.value.getFullYear() === new Date().getFullYear()
  ) {
    //setting it to the current date if it is the same as the user's
    ogDate.value.setDate(new Date().getDate());
  } else {
    ogDate.value.setDate(1);
  }
  today.value = 0;
  today.value = ogDate.value;
  console.log(month.value);

  formatDate();
};

const scheduledTodos = inject("scheduledTodos");

let hasBorder = ref(false);
const addBorder = (selectedDate, currentOne) => {
  if (dateTime(selectedDate) == currentOne) {
    hasBorder.value = true;
    return true;
  }
  // console.log(dateTime(selectedDate), currentOne);
};

//adding a border to the current date
addBorder(currentDate.today.day, dateTime(currentDate.today.day));

const changeDate = (date) => {
  //emiting a new event to the parent to change the date
  emit("change-date", date);
  // console.log(date);
  //adding a border to the newly selected date
  let newDate = new Date(date).getDate();
  currentDate.today.day = newDate;
  addBorder(currentDate.today.day, dateTime(currentDate.today.day));
};

const paddedDate = (day) => {
  return String(day).padStart(2, "0");
};

let monthColor = ref("");

const changeMonthColor = () => {
  switch (currentDate.today.month) {
    case 10:
      monthColor.value = "#C9BA9D";
      break;
    case 11:
      monthColor.value = "#F1F1F6";
      break;
    case 0:
      monthColor.value = "#B8CEE3";
      break;
    case 5:
      monthColor.value = "#92C2EF";
      break;
    case 6:
      monthColor.value = "#FAF57C";
      break;
    default:
      monthColor.value = "white";
  }
};

changeMonthColor();

onUpdated(() => changeMonthColor());
</script>

<template>
  <article
    class="w-[80%]NOT min-h-[30rem] h-[60vh] md:h-[80vh] bg-bgColor rounded-md overflow-hidden grid grid-cols-1 grid-rows-[1.5fr_3fr] shadow-[0rem_0.1rem_1px_0rem_#dcddde,_0rem_0.7rem_0px_-0.3rem_#f9fafa,_0rem_0.7rem_2px_-0.3rem_#dcddde,_0rem_1.3rem_0px_-0.5rem_#f8f8f8,_0rem_1.3rem_2px_-0.5rem_#dcddde,_0rem_1.9rem_0px_-0.8rem_#f4f5f5,_0rem_1.9rem_2px_-0.8rem_#dcddde] dark:shadow-[0rem_0.1rem_1px_0rem_#13151b,_0rem_0.7rem_0px_-0.3rem_#1a1d25,_0rem_0.7rem_2px_-0.3rem_#13151b,_0rem_1.3rem_0px_-0.5rem_#171a21,_0rem_1.3rem_2px_-0.5rem_#13151b,_0rem_1.9rem_0px_-0.8rem_#181921,_0rem_1.9rem_2px_-0.8rem_#13151b] dark:bg-darkBg"
    :style="{ '--month-color': monthColor }"
  >
    <header
      class="bg-[var(--month-color)] p-2 grid grid-cols-3 transition-colors duration-1000"
    >
      <div>
        <button @click="previousMonth" class="p-2 mx-2 dark:text-textColor">
          &lt;
        </button>
        <button @click="nextMonth" class="p-2 mx-2 dark:text-textColor">
          >
        </button>
      </div>
      <!-- {{ today }}{{ currentDate }} -->
      <!-- {{ dateTime(daysOfTheMonth[0]) }} -->
      <!-- {{ hasBorder }} -->
      <Transition name="list">
        <h1
          class="text-[3rem] font-monotonNOT font-gfsDidotNOT uppercase col-span-2 col-start-1 self-end dark:text-darkBg leading-3"
          :key="formattedDate.month"
        >
          {{ formattedDate.month }}
          <span class="text-2xl">
            {{ formattedDate.year }}
          </span>
        </h1>
      </Transition>
    </header>
    <div>
      <ol class="grid grid-cols-[repeat(7,_1fr)] gap-1 text-center my-1">
        <li
          v-for="(weekday, index) in shortWeekdayNames"
          :key="weekday"
          class="group font-raleway"
        >
          <!-- Using the index to get the long names from the original array -->
          <abbr
            :title="weekdays[index]"
            class="font-semibold decoration-solid decoration-2 decoration-lightGrey underline-offset-4 dark:decoration-lightDark group-first-of-type:decoration-[var(--month-color)] group-last-of-type:decoration-[var(--month-color)]"
          >
            {{ weekday }}
          </abbr>
        </li>
      </ol>
      <ol
        class="calendar-grid h-[90%] grid grid-cols-[repeat(7,_1fr)] gap-[0.15rem]"
      >
        <!-- bg-gradient-to-b from-transparent to-transparent via-lightGrey from-0% to-100% via-50% dark:via-lightDark -->
        <li
          v-for="day in paddingDays"
          :key="day"
          class="bg-bgColor opacity-60 dark:bg-darkBg"
          aria-hidden="true"
        ></li>
        <!-- <TransitionGroup name="list" appear> -->
        <li
          v-for="day in daysOfTheMonth"
          :key="day + dateKey"
          class="bg-bgColor p-1 text-ellipsis whitespace-nowrap overflow-hidden relative hover:opacity-50 active:opacity-70 transition-all duration-300 dark:bg-darkBg"
          :class="
            addBorder(day, dateTime(currentDate.today.day))
              ? [
                  'after:border-2',
                  'after:border-accentColor',
                  'after:w-full',
                  'after:h-full',
                  'after:absolute',
                  'after:top-0',
                  'after:right-0',
                  'after:transition-all',
                  'after:duration-300',
                  'after:pointer-events-none',
                ]
              : ''
          "
        >
          <transition name="list" appear>
            <time
              :datetime="dateTime(day)"
              :title="dateTime(day)"
              class="fontA-gfsDidot font-raleway text-sm -mt-1 block text-right"
              :class="
                isCurrentDate(day)
                  ? [
                      ' underline',
                      'decoration-2',
                      'decoration-accentColor',
                      'underline-offset-4',
                    ]
                  : ''
              "
            >
              {{ paddedDate(day) }}
            </time>
          </transition>
          <scheduledTasks
            @change-date="(date) => changeDate(date)"
            :todos="scheduledTodos"
            :date="dateTime(day)"
          ></scheduledTasks>
        </li>
        <!-- </TransitionGroup> -->
        <li
          v-for="day in remainingDays"
          :key="day"
          class="bg-bgColor opacity-60 dark:bg-darkBg"
        ></li>
      </ol>
    </div>
  </article>
</template>

<style>
.calendar-grid {
  background-image: linear-gradient(
    180deg,
    transparent 0,
    var(--grey) 10% 90%,
    transparent
  );
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(5px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
