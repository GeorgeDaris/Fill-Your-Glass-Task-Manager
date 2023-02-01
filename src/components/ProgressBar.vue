<script setup>
// import { ref, computed } from "vue";
defineProps(["total"]);
</script>

<template>
  <div>
    <progress
      :max="total.length"
      :value="total.filter((item) => item.completed).length"
      class="glass"
    ></progress>
  </div>
</template>

<style>
/*.glass {
    transform: rotate(-90deg);
    height: 15rem;
    width: 15rem;
  }
  .glass::after {
    content: "pretend this is a glass of water";
  }*/
</style>
