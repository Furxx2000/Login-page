import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCheck from "./components/UI/BaseCheck.vue";
import SvgIcon from "./components/UI/SvgIcon.vue";

import "normalize.css";

const app = createApp(App);

app.use(router);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-check", BaseCheck);
app.component("svg-icon", SvgIcon);

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

const req = require.context("./assets/icon", true, /\.svg$/);
requireAll(req);

app.mount("#app");
