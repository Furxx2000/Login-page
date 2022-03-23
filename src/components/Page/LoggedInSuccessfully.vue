<template>
  <base-card>
    <the-previous-page-button>Back</the-previous-page-button>
    <h2>Creating account successfully</h2>
    <h3>Thank you</h3>
  </base-card>
</template>

<script>
import ThePreviousPageButton from "../Layout/ThePreviousPageButton.vue";

export default {
  components: { ThePreviousPageButton },
  setup() {},
};
</script>

<style lang="scss" scoped>
h2,
h3 {
  text-align: center;
}
</style>
