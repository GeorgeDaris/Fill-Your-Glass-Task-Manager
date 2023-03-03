<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, reactive, computed, nextTick, watch } from "vue";
import CreateCategory from "./CreateCategory.vue";
import ToolTip from "./ToolTip.vue";
import CategoryLabel from "./CategoryLabel.vue";

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
  button: "Add to-do",
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
  if (newTask.value) {
    newTodo.subTasks.push({ title: newTask.value });
    subTaskWarn.value = false;
    newTask.value = "";
    await nextTick();
    subTaskInput.value.focus();
  } else {
    subTaskWarn.value = true;
    await nextTick();
    subTaskInput.value.focus();
  }
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
    <label for="todo" class="text-lg font-semibold">
      {{ todoInfo.question }}
    </label>
    <br />
    <input
      class="title-input border-[0.2rem] rounded-md p-1 pl-2 border-accentColor w-64 lg:w-80 bg-inherit transition-all duration-100 hover:border-accentLight"
      :placeholder="todoInfo.placeholder"
      name="todo"
      id="todo"
      type="text"
      v-model.trim="newTodo.title"
      ref="input"
      :class="{ activeForm: formIsOpen }"
    />
    <span v-if="warn"> Please add a todo item first </span>

    <div>
      <!-- using the div to align it properly for devices with smaller screens, where we set the form and list to be grid containers to justify them to the center. Since it is absolutely positioned it would otherwise breqak out of the intended flow -->
      <Transition name="slide-fade">
        <div
          class="flex flex-col justify-between border-[0.2rem] rounded-md rounded-t-none p-1 border-accentColor w-64 lg:w-80 max-h-[28rem] overflow-auto bg-bgColor dark:bg-darkBg absolute z-[4] top-[4.1rem] scroll-container shadow-[0.3rem_0.3rem_0px_0px_#ffffff,0.4rem_0.4rem_0px_0px_#7DDECD] dark:shadow-[0.3rem_0.3rem_0px_0px_#1d212a,0.4rem_0.4rem_0px_0px_#7DDECD]"
          v-show="newTodo.title"
        >
          <label class="m-1" for="description">
            {{ todoInfo.description }}
          </label>
          <!-- <br /> -->
          <textarea
            class="flex-shrink-0 border-[0.1rem] rounded-md p-1 border-accentColor bg-inherit m-1 resize-none scroll-container"
            placeholder="Use the three first chapters to showcase the use of literary devices"
            name="description"
            id="description"
            v-model.trim="newTodo.description"
          ></textarea>
          <!-- <br /> -->
          <section>
            <div class="flex flex-col">
              <label class="m-1" for="subtask" id="sub-task"> Sub-task </label>
              <!-- <br /> -->
              <div class="relative flex flex-col">
                <input
                  class="border-[0.1rem] rounded-md p-1 pr-10 border-accentColor over bg-inherit m-1"
                  :placeholder="todoInfo.placeholder"
                  name="subtask"
                  id="subtask"
                  type="text"
                  v-model.trim="newTask"
                  ref="subTaskInput"
                />
                <button
                  class="absolute bottom-[0.27rem] right-1 w-[2.2rem] h-[2.2rem] z-[4] rounded-md rounded-l-none bg-accentColor text-bgColor text-xl font-bold flex items-center justify-center transition-colors duration-3d00 hover:bg-accentLight hover:transition-colors hover:duration-300 dark:text-darkBg"
                  @click.prevent="addSubTask"
                  aria-describedby="sub-task"
                  title="add sub-task"
                >
                  <svg
                    class=""
                    width="20"
                    height="20"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <rect
                      class="fill-bgColor dark:fill-darkBg"
                      y="15.3024"
                      width="33.8837"
                      height="3.27907"
                      rx="1.63953"
                      fill="white"
                    />
                    <rect
                      class="fill-bgColor dark:fill-darkBg"
                      x="18.5814"
                      width="33.8837"
                      height="3.27907"
                      rx="1.63953"
                      transform="rotate(90 18.5814 0)"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <!-- <ToolTip :tooltip-parent="'subtask'"> Add a new sub task </ToolTip> -->
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
            <!-- <hr
              class="bg-lightGrey dark:bg-lightDark h-[0.15rem] border-none rounded-full -my-3 mt-2"
            /> -->
            <ul
              class="flex flex-row justNOTify-center overflow-x-auto overflow-y-hidden gap-4 max-h-32 scroll-container"
            >
              <li v-for="category in categories" :key="category.id">
                <!-- <div
                class="color-indicator"
                :style="{ 'background-color': category.color }"
              ></div>
              <label :for="category.title">
                {{ category.title }}
              </label> -->

                <label :for="category.title">
                  <CategoryLabel
                    :labelColor="category.color"
                    :is-radio-button="true"
                    v-if="category.title === category.title"
                    class="m-0"
                  >
                    <template #input>
                      <input
                        name="category"
                        type="radio"
                        :value="category.title"
                        v-model="newTodo.category"
                        :id="category.title"
                        class="absolute top-[1.2rem] left-[0.17rem] appearance-none w-2 h-2 rounded-full bg-bgColor checked:bg-accentColor z-[0] dark:bg-darkBg"
                      />
                    </template>
                    <template #name>
                      {{ category.title }}
                    </template>
                  </CategoryLabel>
                </label>
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
          <button
            class="p-1 m-1 bg-accentColor rounded-md hover:bg-accentLight text-bgColor dark:text-darkBg"
            @click.enter.prevent="sendTodo"
          >
            {{ todoInfo.button }}
          </button>
        </div>
      </Transition>
    </div>
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
  opacity: 0;
}
</style>
