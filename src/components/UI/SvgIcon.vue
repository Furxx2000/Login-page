<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 回傳字串透過use xlink:href選取對應的svg icon
    const iconName = computed(() => `#icon-${props.iconClass}`);

    // 回傳字串設定在class中，有兩個class分別是通用、及具有icon名稱的樣式
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon icon-${props.iconClass} ` + props.className;
      } else {
        return `svg-icon icon-${props.iconClass}`;
      }
    });

    return { svgClass, iconName };
  },
};
</script>

<style lang="scss" scoped>
// 預設svg-icon樣式
.svg-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
