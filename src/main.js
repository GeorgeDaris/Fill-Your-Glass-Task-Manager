import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { ClickOutside } from "./directives/clickOutside";
import { vFocus } from "./directives/focus";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.directive("click-outside", ClickOutside);
app.directive("focus", vFocus);

app.mount("#app");
