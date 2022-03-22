<template>
  <div class="check_badge">
    <svg-icon
      :icon-class="icon"
      :class="[{ isActive: isLengthActive || isOneNumberActive }, smallIcon]"
    ></svg-icon>
    <span
      class="check-badge__text"
      :class="{ isActive: isLengthActive || isOneNumberActive }"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    isLengthActive: {
      type: Boolean,
      default: false,
    },
    isOneNumberActive: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const smallIcon = computed(() => {
      if (props.isSmall) return "small";
    });

    return { smallIcon };
  },
};
</script>

<style lang="scss" scoped>
// 新增small, isActive讓svg圖比預設樣式更小
.svg-icon.small {
  width: 14px;
  height: 14px;
  fill: #ababab;
  margin-right: 1px;

  &.isActive {
    fill: #4ae7a5;
  }
}

.check-badge__text {
  color: #ababab;
  font-size: 12px;
  font-weight: 500;

  &.isActive {
    color: black;
  }
}
</style>
