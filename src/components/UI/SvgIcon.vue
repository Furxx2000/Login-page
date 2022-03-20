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
    const iconName = computed(() => `#icon-${props.iconClass}`);
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
.svg-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
