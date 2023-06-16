<script setup>
import { ref } from "vue";

defineProps({
  accordion: Boolean,
});

let detailsOpen = ref(true);

const showDetails = () => {
  detailsOpen.value ? (detailsOpen.value = false) : (detailsOpen.value = true);
};
</script>

<template>
  <button
    v-if="accordion"
    @click="showDetails"
    class="mr-1 mt-2 p-1"
    title="Show sub tasks"
  >
    <svg
      width="16"
      height="14"
      viewBox="0 0 108 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      class="-rotate-90 pb-1NOT mb-0.5 transition-transform duration-300"
      :class="{ 'rotate-0': detailsOpen }"
    >
      <path
        d="M100.964 23.1555L96.6714 20.5907L100.964 23.1555C105.743 15.1568 99.9804 5 90.6625 5L17.3375 4.99999C8.01958 4.99999 2.25684 15.1568 7.03651 23.1554L43.699 84.509C48.3556 92.3018 59.6444 92.3018 64.301 84.5091L100.964 23.1555Z"
        stroke="#7C94D2"
        stroke-width="10"
        class="stroke-accentColor hover:stroke-accentLight"
      />
    </svg>
  </button>
  <slot name="main" />
  <div v-if="detailsOpen">
    <slot name="details" />
  </div>
</template>
