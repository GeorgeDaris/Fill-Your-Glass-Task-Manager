<script setup>
import { computed } from "vue";
import { useMonthToNumber } from "../composables/monthToNumber";
const props = defineProps(["date"]);

const leadingZero = computed(() => {
  if (props.date.day < 10) {
    return "0";
  } else {
    return false;
  }
});

const dateTimeString = computed(() => {
  let month = useMonthToNumber(props.date.month);
  if (month < 10) {
    month = "0" + String(month);
  }
  return `${props.date.year}-${month}-${props.date.day}`;
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
          class="flex md:block after:content-[''] after:flex-1 w-full h-full p-2 rounded-md border-[1px] border-b-2 border-lightGrey dark:border-lightDark bg-gradient-to-r md:bg-gradient-to-b from-accentColor to-bgColor from-[25%] to-[25%] md:from-[40.5%] md:to-[40.5%] dark:to-darkBg dark:from-[25%] dark:to-[25%] dark:md:from-[40.5%] dark:md:to-[40.5%]"
        >
          <span
            class="uppercase flex-1 self-center text-left md:text-[0.7rem] tracking-widest inline-block after:content-['\00a0\00a0'] md:after:content-[''] dark:text-darkBg"
            >{{ date.month }}
          </span>

          <span class="md:block text-2xl tracking-widest md:mt-4">
            <span v-if="leadingZero"> {{ leadingZero }}{{ date.day }} </span>
            <span v-else>
              {{ date.day }}
            </span>
          </span>
        </time>
      </p>
    </div>
  </Transition>
</template>
