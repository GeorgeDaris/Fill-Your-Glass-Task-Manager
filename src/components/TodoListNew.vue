<script setup>
import TodoItem from "./TodoItem.vue";

defineProps(["todos"]);
defineEmits(["delete-todo"]);

//Create a seperate editing component to prevent the state from changing for all todos ✔
//Use <details> and <summary> on todos that have sub tasks to create a collapsable accordion ✔
//Look into creating a unique label
</script>

<template>
  <section class="col-start-1 mask">
    <!-- <h4>
      <slot />
    </h4> -->
    <ul
      class="pr-1 w-64 lg:w-80 h-96 overflow-y-auto scroll-container max-[740px]: max-w-[24rem]"
    >
      <TransitionGroup name="todos" tag="ul" appear>
        <li
          class="todo-list-item group"
          v-for="todo in todos.slice().reverse()"
          :key="todo.id"
        >
          <TodoItem
            :todo="todo"
            @delete-todo="$emit('delete-todo', todo)"
          ></TodoItem>
          <hr
            class="bg-lightGrey dark:bg-lightDark h-[0.15rem] border-none rounded-full my-1 mt-2 group-last:hidden group-even:bg-hrOdd dark:group-even:bg-hrDarkOdd"
          />
        </li>
      </TransitionGroup>
    </ul>
  </section>
</template>

<style>
.mask {
  /* mask-image: linear-gradient(180deg, transparent 0, #000 5% 95%, transparent); */
  mask-image: linear-gradient(180deg, transparent 0, #000 2% 98%, transparent);
  border-radius: 0.5rem;
}

:root {
  --category-color: "#525798";
}

.edit-container {
  display: inline-block;
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

.todo-list-item {
  position: relative;
}

.todos-enter-active,
.todos-leave-active {
  transition: all 1.3s ease;
}
.todos-enter-from,
.todos-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
</style>
