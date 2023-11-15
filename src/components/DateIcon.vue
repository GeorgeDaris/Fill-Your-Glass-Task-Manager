<script setup>
import { computed } from "vue";
import { useMonthToNumber } from "../composables/monthToNumber";
const props = defineProps(["date"]);

const leadingZero = computed(() => {
  return props.date.day.padStart(2, "0");
});

const dateTimeString = computed(() => {
  let month = useMonthToNumber(props.date.month);
  month = String(month).padStart(2, "0");
  let date = String(props.date.day).padStart(2, "0");
  return `${props.date.year}-${month}-${date}`;
});

// truncating the month name for mobile devices
const truncatedMonth = computed(() => {
  let width = window.innerWidth > 0 ? window.innerWidth : screen.Width;
  const month = props.date.month;
  const monthNum = useMonthToNumber(month);
  // May, June, July.
  const unabbreviatedMonths = [5, 6, 7];
  if (width < 768 && !unabbreviatedMonths.includes(monthNum)) {
    //September gets abbreviated with an extra letter: Sept.
    if (monthNum == 9) {
      return `${month.substring(0, 4)}.`;
    } else {
      return `${month.substring(0, 3)}.`;
    }
  } else {
    return month;
  }
});
</script>

<template>
  <Transition name="todos" appear>
    <div class="md:ml-4 font-semibold sticky top-12 z-40">
      <p
        class="sticky top-8 md:w-24 md:h-24 text-center md:flex items-center md:justify-center"
      >
        <time
          :datetime="dateTimeString"
          class="flex md:block after:content-[''] after:flex-1 w-full h-full px-2 py-[0.1rem] md:p-2 rounded-md border-[1px] border-b-2 border-lightGrey dark:border-lightDark bg-gradient-to-r md:bg-gradient-to-b from-accentColor to-bgColor from-[25%] to-[25%] md:from-[40.5%] md:to-[40.5%] dark:to-darkBg dark:from-[25%] dark:to-[25%] dark:md:from-[40.5%] dark:md:to-[40.5%]"
        >
          <span
            class="md:uppercase flex-1 self-center text-left md:text-[0.7rem] tracking-widest inline-block after:content-['\00a0\00a0'] md:after:content-[''] dark:text-darkBg"
            >{{ truncatedMonth }}
          </span>

          <span class="md:block text-2xl tracking-widest md:mt-4">
            {{ leadingZero }}
          </span>
        </time>
      </p>
    </div>
  </Transition>
</template>
