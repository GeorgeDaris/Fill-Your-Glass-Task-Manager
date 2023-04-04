<script setup>
import { ref } from "vue";

let navOpen = ref(false);

const toggleNav = () => {
  navOpen.value = !navOpen.value;
  console.log(navOpen.value);
};

const closeNav = () => {
  //closing the navigation menu after the user clicks on a link
  if (navOpen.value) {
    navOpen.value = false;
  } else {
    return;
  }
};
</script>

<template>
  <button class="md:hidden" @click="toggleNav">📜</button>

  <nav
    class="fixed top-0 left-0 md:block border-r-2 border-lightGrey h-full p-2 dark:border-lightDark"
    :class="[
      navOpen
        ? ['block', 'w-full', 'max-[740px]:bg-accentColor', 'z-50']
        : 'hidden',
    ]"
  >
    <button
      class="md:hidden absolute right-0 top-0 m-4"
      v-if="navOpen"
      @click="closeNav"
    >
      X
    </button>
    <ul>
      <li>
        <router-link to="/" @click="closeNav">📋</router-link>
      </li>
      <li>
        <router-link to="/archive" @click="closeNav">🗄️</router-link>
      </li>
    </ul>
  </nav>
</template>
