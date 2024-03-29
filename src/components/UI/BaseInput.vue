<template>
  <!-- Input通用樣式 -->
  <input
    :id="id"
    :type="type"
    :value="val"
    :class="[{ invalid: !isValid }, childClass]"
    @input="enteredTerm"
    @blur="clearValidity"
    @focus="getFocus"
    placeholder="&nbsp;"
    autocomplete="off"
  />
  <label :for="id" class="label">{{ label }}</label>

  <!-- Hidden password  -->
  <span
    v-if="id === 'password' && selectedInput.isVisible"
    class="password__covered"
    >{{ truePassword }}</span
  >

  <!-- Toggle眼睛Icon -->
  <svg-icon
    v-if="id === 'password'"
    @click="checkVisibility"
    icon-class="visibility"
    :class="{ isActive: selectedInput.isVisible }"
  ></svg-icon>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    childClass: {
      type: String,
      required: false,
    },
    inputName: {
      type: Object,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    val: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ["entered-term", "clear-validity", "get-focus", "check-visibility"],
  setup(props, context) {
    const selectedInput = ref(props.inputName);
    let val;
    const truePassword = ref("");

    // 將input值儲存後emit到父層
    const enteredTerm = (e) => {
      // 判斷為password或是其他類型input值
      if (props.id === "password") {
        // 獲取input值
        val = e.target.value;

        // 判斷輸入密碼
        if (val.length >= truePassword.value.length) {
          truePassword.value = truePassword.value.trim() + val.slice(-1);
        } else {
          truePassword.value = truePassword.value.substr(0, val.length);
        }

        if (truePassword.value === "") {
          truePassword.value += " ";
        }

        // 將input值轉成星號
        e.target.value = val.replace(/./g, "*");

        // Emit出去
        context.emit("entered-term", {
          val: e.target.value,
          trueVal: truePassword.value,
          selectedInput,
        });
      } else {
        // emit出去除了password外的input值
        context.emit("entered-term", { val: e.target.value, selectedInput });
      }
    };

    // Emit哪個input需要進行blur
    const clearValidity = () => {
      context.emit("clear-validity", selectedInput);
    };

    // Emit哪個input需要進行focus
    const getFocus = () => {
      context.emit("get-focus", selectedInput);
    };

    // Emit isVisible判斷是否隱藏密碼
    const checkVisibility = () => {
      context.emit("check-visibility", !selectedInput.value.isVisible);
    };

    return {
      enteredTerm,
      clearValidity,
      getFocus,
      selectedInput,
      checkVisibility,
      truePassword,
    };
  },
};
</script>

<style lang="scss" scoped>
// Input中 文字樣式
.label {
  position: absolute;
  top: 19px;
  left: 14px;
  font-size: 16px;
  color: #757575;
  font-weight: 500;
  transform-origin: 0 0;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
  pointer-events: none;
}

input {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 55px;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid transparent;
  background: #f1f5ff;
  border-radius: 5px;
  padding: 16px 12px 0 12px;
  transition: all 0.15s ease;

  &:hover {
    background: #f0f3fd;
  }

  // 利用Placeholder-shown在輸入資料及獲得Focus時Label向上移動
  &:not(:placeholder-shown) + .label {
    color: #757575;
    transform: translate3d(0, -12px, 0) scale(0.75);
  }

  &:focus {
    background: #e9edf8;
    outline: none;

    + .label {
      transform: translate3d(0, -12px, 0) scale(0.75);
    }
  }
}

.invalid {
  border: 1px solid #d93025;
}

.password__input {
  padding: 20px 12px 16px 12px;
}

.password__covered {
  position: absolute;
  top: 36px;
  left: 14px;
  font-size: 12px;
}

.icon-visibility {
  position: absolute;
  fill: #ababab;
  top: 19px;
  right: 18px;
  cursor: pointer;

  &.isActive {
    fill: #3c71ff;
  }
}
</style>
