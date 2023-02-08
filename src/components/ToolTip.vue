<script setup>
defineProps(["tooltipParent"]);
</script>
<template>
  <div class="relative inline-block" role="tooltip" :id="tooltipParent">
    <span class="absolute">
      <slot />
    </span>
  </div>
</template>
