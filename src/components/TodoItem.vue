<script setup>
import { inject, ref } from "vue";
import ProgressBar from "./ProgressBar.vue";
import EditItem from "./EditItem.vue";
import CategoryLabel from "./CategoryLabel.vue";

const props = defineProps(["todo", "inArchive"]);
defineEmits(["delete-todo"]);

const categories = inject("categories");
const updateTodo = inject("updateTodo");

let btnActive = ref("");

const showBtns = () => {
  btnActive.value = "edit-container-active";
};

const hideBtns = () => {
  btnActive.value = "";
};

let isEditing = ref(false);
let editingText = ref("Edit");

const openEditForm = () => {
  isEditing.value ? (isEditing.value = false) : (isEditing.value = true);
};

let detailsOpen = ref(true);

const showDetails = () => {
  detailsOpen.value ? (detailsOpen.value = false) : (detailsOpen.value = true);
};

let todoChecked = ref(props.todo.completed);

const handleCheckbox = () => {
  updateTodo(props.todo.id, undefined, todoChecked.value);
  // updateTodo({ todoId: props.todo.id, checkStatus: todoChecked.value });
  // todoId, newTitle, archiveStatus, checkStatus
};

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <div
    class="hover:opacity-90 transition-opacity duration-300 flex items-start"
    v-if="todo.subTasks && todo.subTasks.length >= 1"
    :class="[
      todo.archived && !inArchive
        ? ['opacity-70', 'border-l-2', 'border-accentColor', 'pl-2']
        : '',
    ]"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <!-- checking for the lenght as well, since I'm pushing the subtasks anyway in App.vue, to prevent all todos from appearing inside a details element -->
    <button @click="showDetails" class="mr-1 mt-2 p-1" title="Show sub tasks">
      <svg
        width="16"
        height="14"
        viewBox="0 0 108 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        class="-rotate-90 pb-1NOT mb-0.5 transition-transform duration-300"
        :class="{ 'rotate-0': detailsOpen }"
      >
        <path
          d="M100.964 23.1555L96.6714 20.5907L100.964 23.1555C105.743 15.1568 99.9804 5 90.6625 5L17.3375 4.99999C8.01958 4.99999 2.25684 15.1568 7.03651 23.1554L43.699 84.509C48.3556 92.3018 59.6444 92.3018 64.301 84.5091L100.964 23.1555Z"
          stroke="#7C94D2"
          stroke-width="10"
          class="stroke-accentColor hover:stroke-accentLight"
        />
      </svg>
    </button>
    <div>
      <label
        class="inline-flex items-centerNOT items-start my-1 relative z-[3]"
        :for="todo.id"
        :id="todo.title"
        @dblclick="openEditForm"
      >
        <input
          class="appearance-none border-[0.15rem] rounded-md p-2 mt-1 border-accentColor bg-inherit peer cursor-pointer checked:bg-accentColor peer"
          type="checkbox"
          :checked="todo.completed"
          v-model="todoChecked"
          :id="todo.id"
          :name="todo.id"
          :disabled="todo.archived"
          ref="summaryCheckbox"
          @change="handleCheckbox"
        />
        <svg
          class="absolute ml-1 mt-[0.6rem] hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          fill="none"
          viewBox="0 0 16 12"
          width="13"
          height="9"
        >
          <path
            class="fill-bgColor dark:fill-darkBg"
            fill="white"
            d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
          />
        </svg>
        <span
          class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
        >
          {{ todo.title }}
        </span>
      </label>
      <div
        v-if="!inArchive"
        class="edit-container absolute right-0 top-0 flex z-50 transition-all duration-75"
        :class="btnActive"
      >
        <button
          class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
          @click="openEditForm"
          @focus="showBtns"
          :title="editingText"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="fill-textColor dark:fill-darkText"
              d="M64.2254 2.82843C65.7875 1.26633 68.3201 1.26633 69.8822 2.82843L80.4888 13.435C82.0509 14.9971 82.0509 17.5298 80.4888 19.0919L74.832 24.7487L58.5685 8.48528L64.2254 2.82843Z"
              fill="black"
            />
            <path
              class="stroke-textColor dark:stroke-darkText"
              d="M55.1543 16.8492L66.468 28.1629L21.9202 72.7106C18.7961 75.8348 13.7307 75.8348 10.6065 72.7106C7.48235 69.5864 7.48235 64.5211 10.6065 61.3969L55.1543 16.8492Z"
              stroke="black"
              stroke-width="7"
            />
          </svg>
        </button>
        <button
          class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
          @click="$emit('delete-todo', todo)"
          @focus="showBtns"
          title="delete"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="27"
              rx="2"
              stroke="black"
              stroke-width="3"
              class="stroke-textColor dark:stroke-darkText"
            />
            <rect
              y="2"
              width="24"
              height="2"
              rx="1"
              fill="black"
              class="fill-textColor dark:fill-darkText"
            />
            <rect
              x="8"
              y="28"
              width="20"
              height="2"
              rx="1"
              transform="rotate(-90 8 28)"
              fill="black"
              class="fill-textColor dark:fill-darkText"
            />
            <rect
              x="7"
              y="1"
              width="10"
              height="1"
              rx="0.5"
              fill="black"
              class="fill-textColor dark:fill-darkText"
            />
            <rect
              x="11"
              width="2"
              height="2"
              rx="1"
              fill="black"
              class="fill-textColor dark:fill-darkText"
            />
            <rect
              x="14"
              y="28"
              width="20"
              height="2"
              rx="1"
              transform="rotate(-90 14 28)"
              fill="black"
              class="fill-textColor dark:fill-darkText"
            />
          </svg>
        </button>
      </div>

      <EditItem
        class="todo-edit-form ml-10"
        :todo="todo"
        v-if="isEditing"
        @edited="openEditForm"
      ></EditItem>

      <div class="grid grid-cols-[2.5rem_4fr] -ml-[0.92rem]">
        <div
          class="col-start-1 row-start-1"
          v-for="category in categories"
          :key="JSON.stringify(category)"
        >
          <CategoryLabel
            :labelColor="category.color"
            :has-sub-tasks="true"
            v-if="category.title === todo.category"
          >
            {{ category.title }}
          </CategoryLabel>
        </div>
        <div class="col-start-2 row-start-1">
          <ProgressBar
            :total="todo.subTasks"
            :todo="todo"
            class=""
          ></ProgressBar>
          <p
            v-if="todo.description"
            class="text-sm p-[0.3rem] bg-lightGrey whitespace-pre-wrap break-words dark:bg-lightDark m-1 rounded-md"
          >
            {{ todo.description }}
          </p>
          <Transition name="slide-fade">
            <div v-if="detailsOpen">
              <ul>
                <li
                  class="ml-[0.3rem]"
                  v-for="task in todo.subTasks"
                  :key="JSON.stringify(task)"
                >
                  <label :for="task.id" class="inline-flex items-start my-0">
                    <input
                      class="appearance-none border-[0.15rem] rounded-full p-2 mt-1 border-accentColor bg-inherit cursor-pointer checked:bg-accentColor peer"
                      type="checkbox"
                      :checked="task.completed"
                      :disabled="todo.archived"
                      v-model="task.completed"
                      :id="task.id"
                      :name="task.id"
                    />
                    <svg
                      class="absolute ml-1 mt-[0.6rem] hidden pointer-events-none peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      fill="none"
                      viewBox="0 0 16 12"
                      width="13"
                      height="9"
                    >
                      <path
                        class="fill-bgColor dark:fill-darkBg"
                        fill="white"
                        d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
                      />
                    </svg>
                    <span
                      class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
                    >
                      {{ task.title }}
                    </span>
                  </label>
                  <!-- <div class="edit-container" :class="btnActive">
          <button @click="openEditForm" @focus="showBtns">
            {{ editingText }}
          </button>
          <button @click="$emit('delete-todo', task)" @focus="showBtns">
            Delete
          </button>
        </div>
        <EditItem
          class="todo-edit-form"
          :todo="task"
          v-if="isEditing"
          @edited="openEditForm"
        ></EditItem> -->
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>

  <!-- :class="{'opacity-70': todo.archived, 'border': todo.archived }" -->
  <div
    v-else
    draggable="true"
    class="hover:opacity-90 transition-opacity duration-300"
    :class="[
      todo.archived && !inArchive
        ? ['opacity-70', 'border-l-2', 'border-accentColor', 'pl-2']
        : '',
    ]"
    @mouseenter="showBtns"
    @mouseleave="hideBtns"
  >
    <label
      class="inline-flex items-centerNOT items-start my-1 relative z-[3]"
      :for="todo.id"
      @dblclick="openEditForm"
    >
      <input
        class="appearance-none border-[0.15rem] rounded-md p-2 mt-1 border-accentColor bg-inherit peer cursor-pointer checked:bg-accentColor peer"
        type="checkbox"
        :checked="todo.completed"
        v-model="todoChecked"
        :disabled="todo.archived"
        :id="todo.id"
        :name="todo.id"
        ref="summaryCheckbox"
        @change="handleCheckbox"
      />

      <svg
        class="absolute ml-1 mt-[0.6rem] hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
        width="13"
        height="9"
        role="presentation"
      >
        <path
          class="fill-bgColor dark:fill-darkBg"
          fill="white"
          d="M 0.375 5.78125 L 1.5625 4.5625 L 5.6875 8.625 L 14.2188 0.124999 L 15.4375 1.34375 L 5.6875 11.0625 L 0.375 5.78125 Z"
        />
      </svg>
      <span
        class="pl-2 peer-checked:line-through peer-checked:opacity-75 transition-all duration-700"
      >
        {{ todo.title }}
      </span>
    </label>
    <div
      v-if="!inArchive"
      class="edit-container absolute right-0 top-0 flex z-50 transition-all duration-75"
      :class="btnActive"
    >
      <button
        class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
        @click="openEditForm"
        @focus="showBtns"
        :title="editingText"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="fill-textColor dark:fill-darkText"
            d="M64.2254 2.82843C65.7875 1.26633 68.3201 1.26633 69.8822 2.82843L80.4888 13.435C82.0509 14.9971 82.0509 17.5298 80.4888 19.0919L74.832 24.7487L58.5685 8.48528L64.2254 2.82843Z"
            fill="black"
          />
          <path
            class="stroke-textColor dark:stroke-darkText"
            d="M55.1543 16.8492L66.468 28.1629L21.9202 72.7106C18.7961 75.8348 13.7307 75.8348 10.6065 72.7106C7.48235 69.5864 7.48235 64.5211 10.6065 61.3969L55.1543 16.8492Z"
            stroke="black"
            stroke-width="7"
          />
        </svg>
      </button>
      <button
        class="mx-1 p-1 rounded-sm bg-lightGrey dark:bg-lightDark active:bg-accentColor hover:brightness-110"
        @click="$emit('delete-todo', todo)"
        @focus="showBtns"
        title="delete"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="27"
            rx="2"
            stroke="black"
            stroke-width="3"
            class="stroke-textColor dark:stroke-darkText"
          />
          <rect
            y="2"
            width="24"
            height="2"
            rx="1"
            fill="black"
            class="fill-textColor dark:fill-darkText"
          />
          <rect
            x="8"
            y="28"
            width="20"
            height="2"
            rx="1"
            transform="rotate(-90 8 28)"
            fill="black"
            class="fill-textColor dark:fill-darkText"
          />
          <rect
            x="7"
            y="1"
            width="10"
            height="1"
            rx="0.5"
            fill="black"
            class="fill-textColor dark:fill-darkText"
          />
          <rect
            x="11"
            width="2"
            height="2"
            rx="1"
            fill="black"
            class="fill-textColor dark:fill-darkText"
          />
          <rect
            x="14"
            y="28"
            width="20"
            height="2"
            rx="1"
            transform="rotate(-90 14 28)"
            fill="black"
            class="fill-textColor dark:fill-darkText"
          />
        </svg>
      </button>
    </div>
    <EditItem
      class="todo-edit-form ml-3"
      :todo="todo"
      v-if="isEditing"
      @edited="openEditForm"
    ></EditItem>
    <div
      class="col-start-1 row-start-1"
      v-for="category in categories"
      :key="JSON.stringify(category)"
    >
      <CategoryLabel
        :labelColor="category.color"
        :has-sub-tasks="false"
        v-if="category.title === todo.category"
      >
        {{ category.title }}
      </CategoryLabel>
    </div>
    <ProgressBar
      v-if="todo.subTasks && todo.subTasks.length > 1"
      :total="todo.subTasks"
    ></ProgressBar>
    <p
      v-if="todo.description"
      class="text-sm p-[0.3rem] bg-lightGrey whitespace-pre-wrap break-words dark:bg-lightDark m-1 rounded-md ml-[1.7rem] max-w-[390.95px]"
    >
      {{ todo.description }}
    </p>
  </div>
</template>

<style>
:root {
  --category-color: "#525798";
}

.edit-container {
  display: inline-block;
  opacity: 0;
}

.edit-container-active {
  opacity: 1;
}

.todo-color::before {
  content: "";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: var(--category-color);
  border-radius: 50%;
  margin-right: 1rem;
}

.todo-edit-form {
  position: absolute;
  left: 1rem;
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
