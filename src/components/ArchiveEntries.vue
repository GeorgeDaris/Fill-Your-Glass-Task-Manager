<script setup>
import { inject, computed } from "vue";
import ArchiveEntry from "./ArchiveEntry.vue";

const archive = inject("archive");

const reversedArchive = computed(() => {
  return archive.slice().reverse();
});
</script>

<template>
  <ul>
    <li v-for="entry in reversedArchive" :key="entry.id">
      <ArchiveEntry :entry="entry"></ArchiveEntry>
    </li>
  </ul>
</template>
