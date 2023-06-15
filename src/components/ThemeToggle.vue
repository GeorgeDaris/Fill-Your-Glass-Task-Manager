<script setup>
import { ref, onUpdated } from "vue";

let theme = ref("");

if (localStorage.theme) {
  localStorage.theme == "dark" ? (theme.value = true) : (theme.value = false);
}

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  theme.value = true;
} else {
  document.documentElement.classList.remove("dark");
  theme.value = false;
}

const changeTheme = () => {
  theme.value
    ? (document.documentElement.classList.add("dark"),
      (localStorage.theme = "dark"))
    : (document.documentElement.classList.remove("dark"),
      (localStorage.theme = "light"));
};

// changeTheme();

onUpdated(() => changeTheme());
</script>

<template>
  <label for="theme">
    <input type="checkbox" name="theme" id="theme" v-model="theme" />
  </label>
</template>
