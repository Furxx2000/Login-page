<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(60, 112, 255, 0.5);
  border-radius: 5px;
}

a:hover,
a:active,
button:hover,
button:active {
  background: #3c71ff;
}

.flat {
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff;
}

.filled {
  color: white;
  background: #3c71ff;
  border: 1px solid #3c71ff;
}

.flat:hover,
.flat:active {
  background: transparent;
  border-bottom: 2px solid rgba(60, 112, 255);
  border-radius: 0;
}

.filled:hover,
.filled:active {
  box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);
}

@media only screen and (max-width: 425px) {
  button,
  a {
    justify-content: center;
  }
}
</style>
