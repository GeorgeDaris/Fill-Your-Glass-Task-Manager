<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, reactive, computed, nextTick, watch } from "vue";
import CreateCategory from "./CreateCategory.vue";

defineProps(["categories"]);
const emit = defineEmits(["add-todo", "add-category"]);

const todoInfo = ref({
  question: "What needs to be done?",
  placeholder: "E.g Write an essay on Kazantzakis' vocabulary",
  description: "Description",
  category: {
    title: "Category",
    work: "Work",
    personal: "Personal",
  },
  button: "Add todo",
});

const newTodo = reactive({
  title: "",
  description: "",
  category: "",
  subTasks: [],
});

let warn = ref(false);
let subTaskOpen = ref(false);
let subTaskWarnMessage = ref("Please enter a sub task first");
let subTaskWarn = ref(false);
let newTask = ref("");
let subTaskInput = ref(null);

const addSubTask = async () => {
  // if (!subTaskOpen.value) {
  //   subTaskOpen.value = !subTaskOpen.value;
  //   await nextTick(); //focus management
  //   subTaskInput.value.focus();
  // } else
  if (newTask.value) {
    newTodo.subTasks.push({ title: newTask.value });
    console.log(newTask.value);
    subTaskWarn.value = false;
    newTask.value = "";
    await nextTick();
    subTaskInput.value.focus();
  } else {
    subTaskWarn.value = true;
    await nextTick();
    subTaskInput.value.focus();
  }
  //could need a foreach
  //newTodo.subTasks.forEach((task) => {
  //task.push({title: newTask})
  //})
  //newTodo.subTasks.push({title: newTask})
};

const uniqueSubTaskId = computed(() => {
  return Date.now + Math.random();
});

const reversedSubTasks = computed(() => {
  return newTodo.subTasks.slice().reverse();
});

let input = ref(null); //accesing the input element

const sendTodo = async () => {
  if (newTodo.title) {
    emit("add-todo", newTodo);
    newTodo.title = "";
    newTodo.description = "";
    newTodo.category = "";
    newTodo.subTasks = [];

    await nextTick();
    input.value.focus();
    warn.value = false;
    subTaskOpen.value = false;
  } else {
    warn.value = true;
    input.value.focus();
  }
};

const sendCategory = (newCategory) => {
  //bubbling up the emitted event from CreateCategory
  emit("add-category", newCategory);
};

let formIsOpen = ref(false);

watch(newTodo, async (newerTodo) => {
  //conditionally changing the border radius when the user starts typing
  newerTodo.title ? (formIsOpen.value = true) : (formIsOpen.value = false);
});
</script>

<template>
  <form class="relative">
    <!--<pre>{{newTodo}}
    </pre>-->
    <label class="text-lg font-semibold">
      {{ todoInfo.question }}
    </label>
    <br />
    <input
      class="title-input border-[0.2rem] rounded-lg p-1 border-accentColor w-64 bg-inherit hover:border-accentLight"
      :placeholder="todoInfo.placeholder"
      type="text"
      v-model.trim="newTodo.title"
      ref="input"
      :class="{ activeForm: formIsOpen }"
    />
    <!-- <br /> -->
    <span v-if="warn"> Please add a todo item first </span>
    <!-- <br /> -->
    <Transition name="slide-fade">
      <div
        class="flex flex-col justify-between border-[0.2rem] rounded-lg rounded-t-none p-1 border-accentColor w-64 max-h-[30rem] overflow-auto bg-bgColor dark:bg-darkBg absolute z-[3] top-[4.1rem] scroll-container shadow-[0.2rem_0.2rem_0px_0px_#ffffff,0.4rem_0.4rem_0px_0px_#7DDECD] dark:shadow-[0.2rem_0.2rem_0px_0px_#1d212a,0.4rem_0.4rem_0px_0px_#7DDECD]"
        v-show="newTodo.title"
      >
        <label class="m-1">
          {{ todoInfo.description }}
        </label>
        <!-- <br /> -->
        <textarea
          class="border-[0.1rem] rounded-lg p-1 border-accentColor bg-inherit m-1 resize-none scroll-container"
          placeholder="Use the three first chapters to showcase the use of literary devices"
          v-model.trim="newTodo.description"
        ></textarea>
        <!-- <br /> -->
        <section>
          <div class="flex flex-col">
            <label class="m-1"> Sub-task </label>
            <!-- <br /> -->
            <div class="relative flex flex-col">
              <input
                class="border-[0.1rem] rounded-lg p-1 border-accentColor over bg-inherit m-1"
                :placeholder="todoInfo.placeholder"
                type="text"
                v-model.trim="newTask"
                ref="subTaskInput"
              />
              <button
                class="absolute bottom-[0.27rem] right-1 w-[2.2rem] h-[2.2rem] z-[4] rounded-lg rounded-l-none bg-accentColor text-bgColor text-xl font-bold transition-colors duration-3d00 hover:bg-accentLight hover:transition-colors hover:duration-300 dark:text-darkBg"
                @click.prevent="addSubTask"
                tooltip="Add sub-task"
              >
                +
              </button>
            </div>
            <p class="m-1" v-if="subTaskWarn">
              {{ subTaskWarnMessage }}
            </p>
            <ul class="m-1 max-h-20 overflow-auto scroll-container">
              <li
                class="list-disc list-inside marker:text-accentColor"
                v-for="task in reversedSubTasks"
                :key="uniqueSubTaskId"
              >
                {{ task.title }}
              </li>
            </ul>
          </div>
        </section>
        <!-- <br /> -->
        <section class="flex flex-col m-1">
          <h3>
            {{ todoInfo.category.title }}
          </h3>
          <ul>
            <li v-for="category in categories">
              <div
                class="color-indicator"
                :style="{ 'background-color': category.color }"
              ></div>
              <label :for="category.title">
                {{ category.title }}
              </label>
              <input
                name="category"
                type="radio"
                :value="category.title"
                v-model="newTodo.category"
                :id="category.title"
              />
            </li>
          </ul>
          <!--<label> Simplified it with a v-for
          {{todoInfo.category.work}}
        </label>
        <input name="category" type="radio" :value="todoInfo.category.work" v-model="newTodo.category">
        <label>
          {{todoInfo.category.personal}}
        </label>
        <input name="category" type="radio" :value="todoInfo.category.personal" v-model="newTodo.category">-->
        </section>
        <CreateCategory @send-category="sendCategory"></CreateCategory>
        <!-- <br /> -->
        <button @click.enter.prevent="sendTodo">
          {{ todoInfo.button }}
        </button>
      </div>
    </Transition>
  </form>
</template>

<style scoped>
.title-input:focus {
  outline: none;
}
.color-indicator {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  /*background-color: v-bind('categories[1].color');*/
  border-radius: 50%;
  margin-right: 1rem;
}

.activeForm {
  /*gets used when the user starts typing*/
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
  transition: all 0.1s;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateY(-2px); */
  opacity: 0;
}
</style>
