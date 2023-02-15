<script setup>
defineProps(["labelColor", "hasSubTasks"]);
// console.log(labelColor);
// console.log(fullConfig.theme.width[4]);
// text-[0.8rem]
// ml-[0.2rem]
</script>

<template>
  <div
    v-if="hasSubTasks"
    class="group aNOTbsolute top-[0.67rem] left-[0.4rem] scale-75 label-container floatNOT-left -mt-6 ml-[0.4rem]"
    :style="{ '--label-color': labelColor }"
  >
    <div
      class="string inline-block relative w-4 h-[1.55rem] border-[0.05rem] border-textColor border-b-[transparent] rounded-[70%] -mb-[0.8rem] z-[2] transition-all duration-700 after:content-[''] after:w-[0.52rem] after:h-[0.5rem] after:bg-[var(--label-color)] after:absolute after:bottom-[0.13rem] after:-left-[0.2rem] after:rotate-[33deg] dark:border-bgColor group-hover:-rotate-[3deg]"
    ></div>
    <div
      class="label inline-block text-bgColor p-1 pt-6 relative rounded-sm origin-top transition-all duration-700 after:content-[''] after:block after:absolute after:left-0 after:top-0 after:width-0 after:border-t-solid after:border-b-[0.8rem] after:border-b-[var(--label-color)] after:border-l-solid after:border-l-[0.7rem] after:border-l-bgColor before:content-[''] before:block before:absolute before:right-0 before:top-0 before:width-0 before:border-b-solid before:border-b-[0.8rem] before:border-b-[var(--label-color)] before:border-r-solid before:border-r-[0.7rem] before:border-r-bgColor hover:transition-all hover:duration-700 before:dark:border-r-darkBg after:dark:border-l-darkBg group-hover:-rotate-[3deg] group-hover:origin-top"
      :style="{ 'background-color': labelColor, '--label-color': labelColor }"
    >
      <span
        class="label-paper bg-bgColor text-textColor py-0.5 px-1 rounded-sm relative before:content-[''] before:inline-block before:absolute before:-top-4 before:right-2 before:w-2 before:h-2 before:bg-bgColor before:rounded-full z-[1] before:shadow-[0.1rem_0.1rem_0rem_0rem] before:shadow-textColor before:dark:bg-darkBg before:dark:shadow-bgColor"
      >
        <slot />
      </span>
    </div>
  </div>

  <div
    v-else
    class="group abNOTsolute top-4 left-0 scale-75 -ml-[0.2rem] -mt-2"
    :style="{ '--label-color': labelColor }"
  >
    <!-- <div
      class="string inline-block relative w-4 h-[1.55rem] border-[0.05rem] border-textColor border-b-[transparent] rounded-[70%] -mb-2 -mr-2 z-[2] transition-all duration-700 after:content-[''] after:w-[0.52rem] after:h-[0.5rem] after:bg-[var(--label-color)] after:absolute after:bottom-[0.13rem] after:-left-[0.2rem] after:rotate-[33deg] dark:border-bgColor group-hover:-rotate-[3deg]"
    ></div> -->
    <div
      class="label inline-block text-bgColor p-1 pl-6 relative rounded-sm transition-all duration-700 after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:width-0 after:border-t-solid after:border-t-[0.6rem] after:border-t-[var(--label-color)] after:border-l-solid after:border-l-[1rem] after:border-l-bgColor before:content-[''] before:block before:absolute before:left-0 before:top-0 before:width-0 before:border-b-solid before:border-b-[0.6rem] before:border-b-[var(--label-color)] before:border-l-solid before:border-l-[1rem] before:border-l-bgColor hover:transition-all hover:duration-700 before:dark:border-l-darkBg after:dark:border-l-darkBg group-hover:rotate-[3deg] group-hover:origin-left"
      :style="{ 'background-color': labelColor, '--label-color': labelColor }"
    >
      <span
        class="label-paper bg-bgColor text-textColor py-0.5 px-1 rounded-sm relative before:content-[''] before:inline-block before:absolute before:-left-4 before:top-2 before:w-2 before:h-2 before:bg-bgColor before:rounded-full z-[1] before:shadow-[0.1rem_0.1rem_0rem_0rem] before:shadow-textColor before:dark:bg-darkBg before:dark:shadow-bgColor"
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

.label-container {
  writing-mode: vertical-lr;
}

/* .smaller-version {
  font-size: 10px;
} */
</style>
