<script setup>
defineProps(["labelColor"]);
// console.log(labelColor);
// console.log(fullConfig.theme.width[4]);
</script>

<template>
  <div class="ml-4">
    <div
      class="string inline-block relative w-4 h-8 border-[0.05rem] border-textColor border-b-[transparent] rounded-[70%] -mb-2 -mr-3 z-[2] after:content-[''] after:w-[0.52rem] after:h-[0.5rem] after:bg-labelColor after:absolute after:bottom-[0.22rem] after:-left-[0.2rem] dark:border-bgColor"
    ></div>
    <div
      class="label inline-block text-bgColor p-1 pl-6 relative rounded-sm rotate-90 origin-left transition-all duration-700 after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:width-0 after:border-t-solid after:border-t-[0.6rem] after:border-t-[var(--label-color)] after:border-l-solid after:border-l-[1rem] after:border-l-bgColor before:content-[''] before:block before:absolute before:left-0 before:top-0 before:width-0 before:border-b-solid before:border-b-[0.6rem] before:border-b-[var(--label-color)] before:border-l-solid before:border-l-[1rem] before:border-l-bgColor hover:rotate-[80deg] hover:transition-all hover:duration-700 before:dark:border-l-darkBg after:dark:border-l-darkBg"
      :style="{ 'background-color': labelColor, '--label-color': labelColor }"
    >
      <span
        class="label-paper bg-bgColor text-textColor py-0.5 px-1 rounded-sm relative before:content-[''] before:inline-block before:absolute before:-left-4 before:top-2 before:w-2 before:h-2 before:bg-bgColor before:rounded-full z-[1] before:shadow-[0.1rem_-0.1rem_0rem_0rem] before:shadow-textColor before:dark:bg-darkBg before:dark:shadow-bgColor"
      >
        <slot />
      </span>
    </div>
  </div>
</template>

<style scoped>
/*using CSS custom variables with tailwind's arbitrary values to change the background color of the pseudo elements with Vue's style bindings*/
:root {
  --label-color: red;
}
</style>
