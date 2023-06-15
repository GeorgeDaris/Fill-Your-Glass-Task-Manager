<script setup>
import { ref } from "vue";

import ThemeToggle from "./ThemeToggle.vue";

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
  <button
    class="md:hidden m-2 p-2"
    @click="toggleNav"
    title="toggle navigation"
  >
    <svg
      width="30"
      height="18"
      viewBox="0 0 77 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        class="fill-accentColor"
        width="77"
        height="10"
        rx="5"
        fill="#1D212A"
      />
      <rect
        class="fill-accentColor"
        y="22"
        width="77"
        height="10"
        rx="5"
        fill="#1D212A"
      />
      <rect
        class="fill-accentColor"
        y="44"
        width="77"
        height="10"
        rx="5"
        fill="#1D212A"
      />
    </svg>
  </button>

  <header
    class="fixed top-0 left-0 md:block border-r-2 border-lightGrey h-full p-2 dark:border-lightDark"
    :class="[
      navOpen
        ? [
            'grid',
            'place-items-center',
            'w-full',
            'max-[740px]:bg-bgColor',
            'z-50',
            'max-[740px]:dark:bg-darkBg',
          ]
        : 'hidden',
    ]"
  >
    <nav>
      <button
        class="md:hidden absolute right-0 top-0 m-4"
        title="Exit navigation view"
        v-if="navOpen"
        @click="closeNav"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 62 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            class="fill-textColor dark:fill-darkText"
            x="0.0944214"
            y="55.5415"
            width="77"
            height="10"
            rx="5"
            transform="rotate(-45 0.0944214 55.5415)"
            fill="#1D212A"
          />
          <rect
            class="fill-textColor dark:fill-darkText"
            x="7.16547"
            y="0.387207"
            width="77"
            height="10"
            rx="5"
            transform="rotate(45 7.16547 0.387207)"
            fill="#1D212A"
          />
        </svg>
      </button>
      <ul>
        <li>
          <router-link
            to="/"
            @click="closeNav"
            title="Task View"
            class="inline-block my-1"
            :class="[navOpen ? ['flex', 'my-8'] : '']"
          >
            <svg
              width="25"
              height="30"
              viewBox="0 0 73 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="fill-lightGrey dark:fill-lightDark"
                y="2"
                width="73"
                height="77"
                rx="10"
                fill=""
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="1"
                y="19"
                width="71"
                height="57"
                rx="9"
                fill=""
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="1"
                y="19"
                width="71"
                height="57"
                rx="9"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="fill-bgColor dark:fill-darkBg stroke-lightGrey dark:stroke-lightDark"
                x="2"
                y="4"
                width="69"
                height="71"
                rx="8"
                stroke="#EAEDF5"
                stroke-width="4"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="8"
                y="63"
                width="56"
                height="2"
                rx="1"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="8"
                y="50"
                width="56"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="32"
                y="38"
                width="32"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="48"
                y="27"
                width="16"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="48"
                y="14"
                width="16"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <path
                class="fill-accentColor"
                d="M6.60227 31.358L11.4091 26.5341L19.3011 34.2898L36.8068 16.8523L41.6477 21.6761L19.3011 43.9034L6.60227 31.358Z"
                fill="#7C94D2"
              />
            </svg>
            <span v-if="navOpen" class="ml-4 text-accentColor font-semibold"
              >Tasks</span
            >
          </router-link>
        </li>
        <li>
          <router-link
            to="/archive"
            @click="closeNav"
            title="Archive View"
            class="inline-block my-1"
            :class="[navOpen ? ['flex', 'my-8'] : '']"
          >
            <svg
              width="25"
              height="30"
              viewBox="0 0 73 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="fill-lightGrey dark:fill-lightDark"
                y="14"
                width="73"
                height="60"
                rx="10"
                fill="#EAEDF5"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="1"
                y="29"
                width="71"
                height="42"
                rx="9"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark"
                x="1"
                y="29"
                width="71"
                height="42"
                rx="9"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="2"
                y="16"
                width="69"
                height="54"
                rx="8"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="4"
              />
              <rect
                class="stroke-accentColor fill-bgColor dark:fill-darkBg"
                x="8.5"
                y="1.5"
                width="55"
                height="67"
                rx="8.5"
                fill="white"
                stroke="#7C94D2"
                stroke-width="3"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="2"
                y="40"
                width="69"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="rounded-md stroke-lightGrey dark:stroke-lightDark fill-lightGrey dark:fill-lightDark"
                x="2"
                y="43.7"
                width="69"
                height="26"
                fill="#EAEDF5"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="24.75"
                y="28.75"
                width="32.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="1.5"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="40.75"
                y="19.75"
                width="16.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="1.5"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="40.75"
                y="9.75"
                width="16.5"
                height="1.5"
                rx="0.75"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="1.5"
              />
              <path
                class="stroke-bgColor dark:stroke-darkBg fill-bgColor dark:fill-darkBg"
                d="M24 44H49V49C49 52.3137 46.3137 55 43 55H30C26.6863 55 24 52.3137 24 49V44Z"
                stroke="white"
                stroke-opacity="0.82"
                stroke-width="4"
              />
              <path
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                d="M24 41H49V46C49 49.3137 46.3137 52 43 52H30C26.6863 52 24 49.3137 24 46V41Z"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="4"
              />
            </svg>
            <span v-if="navOpen" class="ml-4 text-accentColor font-semibold"
              >Archive</span
            >
          </router-link>
        </li>
        <li>
          <router-link
            to="/calendar"
            @click="closeNav"
            title="Calendar View"
            class="inline-block my-1"
            :class="[navOpen ? ['flex', 'my-8'] : '']"
          >
            <svg
              width="25"
              height="30"
              viewBox="0 0 73 77"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-lightGrey dark:fill-lightDark"
                width="73"
                height="77"
                rx="10"
                fill="#EAEDF5"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="1"
                y="17"
                width="71"
                height="57"
                rx="9"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="1"
                y="17"
                width="71"
                height="57"
                rx="9"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="2"
                y="18"
                width="69"
                height="55"
                rx="8"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="4"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="12"
                y="33"
                width="7"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="26"
                y="33"
                width="6"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <rect
                class="stroke-accentColor dark:stroke-accentColor fill-bgColor dark:fill-darkBg"
                x="40"
                y="33"
                width="7"
                height="2"
                rx="1"
                stroke="#7C94D2"
                stroke-width="2"
              />
              <rect
                class="stroke-lightGrey dark:stroke-lightDark fill-bgColor dark:fill-darkBg"
                x="54"
                y="33"
                width="7"
                height="2"
                rx="1"
                fill="white"
                stroke="#EAEDF5"
                stroke-width="2"
              />
              <path
                class="fill-accentColor"
                d="M0 10C0 4.47715 4.47715 0 10 0H63C68.5228 0 73 4.47715 73 10V29H0V10Z"
                fill="#7C94D2"
              />
            </svg>
            <span v-if="navOpen" class="ml-4 text-accentColor font-semibold"
              >Calendar</span
            >
          </router-link>
        </li>
      </ul>
    </nav>
    <ThemeToggle class="mt-auto" />
  </header>
</template>

<style>
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -0.65rem;
  width: 0.12rem;
  height: 0.8rem;
  background-color: var(--accent);
  transition: all 1.3s;
}
</style>
