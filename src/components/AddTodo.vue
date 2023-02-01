<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, reactive, computed, nextTick } from "vue";
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
</script>

<template>
  <form>
    <!--<pre>{{newTodo}}
    </pre>-->
    <label>
      {{ todoInfo.question }}
    </label>
    <br />
    <input
      :placeholder="todoInfo.placeholder"
      type="text"
      v-model.trim="newTodo.title"
      ref="input"
    />
    <br />
    <span v-if="warn"> Please add a todo item first </span>
    <br />
    <label>
      {{ todoInfo.description }}
    </label>
    <br />
    <textarea
      placeholder="Use the three first chapters to showcase the use of literary devices"
      v-model.trim="newTodo.description"
    ></textarea>
    <br />
    <section>
      <div>
        <label> Sub-task </label>
        <br />
        <input
          :placeholder="todoInfo.placeholder"
          type="text"
          v-model.trim="newTask"
          ref="subTaskInput"
        />
        <button @click.prevent="addSubTask">+ Add sub-task</button>
        <p v-if="subTaskWarn">
          {{ subTaskWarnMessage }}
        </p>
        <ul>
          <li v-for="task in reversedSubTasks" :key="uniqueSubTaskId">
            {{ task.title }}
          </li>
        </ul>
      </div>
    </section>
    <br />
    <section>
      <h3>
        {{ todoInfo.category.title }}
      </h3>
      <ul>
        <li v-for="category in categories">
          <div
            class="color-indicator"
            :style="{ 'background-color': category.color }"
          ></div>
          <label>
            {{ category.title }}
          </label>
          <input
            name="category"
            type="radio"
            :value="category.title"
            v-model="newTodo.category"
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
    <br />
    <button @click.enter.prevent="sendTodo">
      {{ todoInfo.button }}
    </button>
  </form>
</template>

<style scoped>
.color-indicator {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  /*background-color: v-bind('categories[1].color');*/
  border-radius: 50%;
  margin-right: 1rem;
}
</style>
