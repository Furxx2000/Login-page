<template>
  <div class="base-check">
    <slot></slot>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.base-check {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
