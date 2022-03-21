<template>
  <form @submit.prevent="submitForm">
    <div class="name">
      <div class="form-control">
        <input
          type="text"
          id="firstname"
          :class="{ invalid: !firstName.isValid }"
          v-model.trim="firstName.val"
          placeholder="&nbsp;"
          autocomplete="off"
          @blur="clearValidity(firstName)"
        />
        <label for="firstname" class="label">First Name</label>
      </div>

      <div class="form-control">
        <input
          type="text"
          id="lastname"
          :class="{ invalid: !lastName.isValid }"
          v-model.trim="lastName.val"
          placeholder="&nbsp;"
          autocomplete="off"
          @blur="clearValidity(lastName)"
        />
        <label for="lastname" class="label">Last Name</label>
      </div>
    </div>

    <div class="form-control">
      <input
        type="email"
        id="email"
        :class="{ invalid: !email.isValid }"
        v-model.trim="email.val"
        placeholder="&nbsp;"
        autocomplete="off"
        @blur="clearValidity(email)"
      />
      <label for="email" class="label">E-mail</label>
    </div>

    <div class="form-control">
      <input
        type="password"
        id="password"
        class="password__input"
        :class="{ invalid: !password.isValid }"
        v-model.trim="password.val"
        placeholder="&nbsp;"
        autocomplete="off"
        @blur="clearValidity(password)"
        @focus="setFocus"
      />
      <label for="password" class="label">Password</label>
      <span v-if="isVisible" class="password__covered">{{ password.val }}</span>

      <svg-icon
        @click="toggleVisibility"
        icon-class="visibility"
        :class="{ isActive: isVisible }"
      ></svg-icon>
      <div v-if="password.isFocused" class="password__check">
        <base-check>
          <svg-icon
            icon-class="check_circle"
            :class="{ isActive: password.isLengthActive }"
          ></svg-icon>
          <span :class="{ isActive: password.isLengthActive }"
            >8 Characters min</span
          >
        </base-check>
        <base-check>
          <svg-icon
            icon-class="check_circle"
            :class="{ isActive: password.isOneNumberActive }"
          ></svg-icon>
          <span :class="{ isActive: password.isOneNumberActive }"
            >One number</span
          >
        </base-check>
      </div>
    </div>

    <div class="form-control agreement">
      <input
        type="checkbox"
        id="agreement__checkbox"
        class="agreement__checkbox"
        v-model="agreement.val"
      />
      <p class="agreement__text">
        By creating account, you agree to accept our Privacy Policy, Terms of
        Service and Notification settings.
      </p>
    </div>
    <base-button class="submit" mode="filled">
      <p>Create an Free Account</p>
    </base-button>
    <div class="login">
      <p>Already have an account?</p>
      <base-button link to="/login" class="login__link" mode="flat"
        >Log in</base-button
      >
    </div>
  </form>
</template>

<script>
import { ref, watch } from "vue";

export default {
  setup() {
    const firstName = ref({ val: "", isValid: true });
    const lastName = ref({ val: "", isValid: true });
    const email = ref({ val: "", isValid: true });
    const password = ref({
      val: "",
      isValid: true,
      isFocused: false,
      isLengthActive: false,
      isOneNumberActive: false,
    });
    const agreement = ref({ val: null, isValid: true });
    const isVisible = ref(false);
    const formIsValid = ref(true);

    // 正規表達式驗證input資料
    const namesRule = /^[\u4e00-\u9fa5]+$|^[a-zA-Z\s]+$/;
    const passwordRule = /[a-zA-Z0-9]{8,}/;
    const atLeastOneNumberRule = /[0-9]/;

    // input在blur後狀態處理
    const clearValidity = (input) => {
      input.isValid = true;
      if (password.value.val === "") {
        password.value.isFocused = false;
      }
    };

    const setFocus = () => {
      password.value.isFocused = true;
    };

    // toggle password
    const toggleVisibility = () => {
      isVisible.value = !isVisible.value;
    };

    // 監聽password input的值是否有包含1個數字
    watch(
      () => password.value.val,
      (newVal) => {
        if (atLeastOneNumberRule.test(newVal)) {
          password.value.isOneNumberActive = true;
        } else {
          password.value.isOneNumberActive = false;
        }
      }
    );

    // 監聽password input的值是否達到8個位元長度
    watch(
      () => password.value.val,
      (newVal) => {
        if (newVal.length >= 8) {
          password.value.isLengthActive = true;
        } else {
          password.value.isLengthActive = false;
        }
      }
    );

    // 驗證表單
    const validateForm = () => {
      formIsValid.value = true;
      if (!namesRule.test(firstName.value.val)) {
        firstName.value.isValid = false;
        formIsValid.value = false;
      }
      if (!namesRule.test(lastName.value.val)) {
        lastName.value.isValid = false;
        formIsValid.value = false;
      }
      if (!passwordRule.test(password.value.val)) {
        password.value.isValid = false;
        formIsValid.value = false;
      }
      if (!email.value.val.includes("@")) {
        email.value.isValid = false;
        formIsValid.value = false;
      }
      if (!agreement.value.val) {
        agreement.value.isValid = false;
        formIsValid.value = false;
      }
    };

    // 表單送出
    const submitForm = () => {
      validateForm();

      if (!formIsValid.value) {
        return;
      }

      console.log("Submit successfully!");
    };

    return {
      firstName,
      lastName,
      email,
      password,
      agreement,
      isVisible,
      toggleVisibility,
      submitForm,
      clearValidity,
      setFocus,
    };
  },
};
</script>

<style lang="scss" scoped>
.name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 14px;
}

.submit {
  width: 100%;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #757575;
  font-weight: 500;

  &__link {
    color: #3c71ff;
    font-weight: 700;
    padding-top: 2px;
  }

  &:hover {
    color: #3d3d3d;

    &__link {
      color: red;
    }
  }
}

.form-control {
  position: relative;
  margin-bottom: 0.8rem;
  margin-top: auto;
  overflow: hidden;

  .password__input {
    padding: 16px 12px !important;
  }

  .password__covered {
    position: absolute;
    top: 36px;
    left: 14px;
    font-size: 12px;
  }

  .password__check {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 3px;

    .base-check {
      margin-right: 1rem;

      .svg-icon {
        width: 14px;
        height: 14px;
        fill: #ababab;
        margin-right: 1px;

        &.isActive {
          fill: #4ae7a5;
        }
      }

      span {
        color: #ababab;
        font-size: 12px;
        font-weight: 500;

        &.isActive {
          color: black;
        }
      }
    }
  }

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

  input:not(input[type="checkbox"]) {
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

  // 將預設checkbox隱藏並用pseudo-element客製出樣式
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 30px;
    height: 18px;
    background-color: #ababab;
    border: 1.5px solid #ababab;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"]::after {
    font-family: "Font Awesome 6 free";
    font-weight: 900;
    content: "\f00c";
    font-size: 15px;
    color: #3c71ff;
    display: none;
  }

  input[type="checkbox"]:hover {
    background-color: #797979;
  }

  input[type="checkbox"]:checked {
    background-color: #ffffff;
    border: 1.5px solid black;
  }

  input[type="checkbox"]:checked::after {
    display: block;
  }

  .agreement__text {
    font-size: 13px;
    color: #757575;
    line-height: 16px;
  }

  .invalid {
    border: 1px solid #d93025 !important;
  }
}
</style>
