<template>
  <form @submit.prevent="submitForm">
    <!-- FullName section start -->
    <div class="name">
      <!-- FirstName input -->
      <div class="form-control">
        <base-input
          id="first-name"
          type="text"
          @entered-term="updateEnteredTerm"
          @clear-validity="clearValidity"
          @get-focus="setFocus"
          :input-name="firstName"
          :isValid="firstName.isValid"
          :val="firstName.val"
          :label="'First name'"
        ></base-input>
      </div>

      <!-- LastName input -->
      <div class="form-control">
        <base-input
          id="last-name"
          type="text"
          @entered-term="updateEnteredTerm"
          @clear-validity="clearValidity"
          @get-focus="setFocus"
          :input-name="lastName"
          :isValid="lastName.isValid"
          :val="lastName.val"
          :label="'Last name'"
        ></base-input>
      </div>
    </div>
    <!-- FullName section end -->

    <!-- E-mail Input -->
    <div class="form-control">
      <base-input
        id="email"
        type="email"
        @entered-term="updateEnteredTerm"
        @clear-validity="clearValidity"
        @get-focus="setFocus"
        :input-name="email"
        :isValid="email.isValid"
        :val="email.val"
        :label="'E-mail'"
      ></base-input>
    </div>

    <!-- Password Input -->
    <div class="form-control">
      <base-input
        id="password"
        type="text"
        :childClass="'password__input'"
        @entered-term="updateEnteredTerm"
        @clear-validity="clearValidity"
        @get-focus="setFocus"
        @check-visibility="toggleVisibility"
        :input-name="password"
        :isValid="password.isValid"
        :val="password.val"
        :label="'Password'"
      ></base-input>

      <!-- Password checks -->
      <div v-if="password.isFocused" class="password__check">
        <base-passwordCheck
          class="check-badge"
          :icon="'check_circle'"
          :is-length-active="password.isLengthActive"
          :isSmall="true"
          >8 Characters min</base-passwordCheck
        >
        <base-passwordCheck
          class="check-badge"
          :icon="'check_circle'"
          :is-one-number-active="password.isOneNumberActive"
          :isSmall="true"
          >One number</base-passwordCheck
        >
      </div>
    </div>

    <!-- Agreement checkbox -->
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

    <!-- Create account button -->
    <base-button class="create-account" mode="filled">
      <p>Create an Free Account !</p>
    </base-button>

    <!-- Already have an account notification -->
    <div class="already-have-account">
      <p>Already have an account?</p>
      <base-button
        link
        to="/login"
        class="already-have-account__link"
        mode="flat"
        >Log in</base-button
      >
    </div>
  </form>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

export default {
  setup() {
    // Router
    const router = useRouter();

    // User資料ref
    const firstName = ref({ val: "", isValid: true });
    const lastName = ref({ val: "", isValid: true });
    const email = ref({ val: "", isValid: true });
    const password = ref({
      val: "",
      trueVal: "",
      isValid: true,
      isFocused: false,
      isLengthActive: false,
      isOneNumberActive: false,
      isVisible: false,
    });
    const agreement = ref({ val: null, isValid: true });
    const formIsValid = ref(true);

    // 透過BaseInput component得到資料
    const updateEnteredTerm = (data) => {
      if (data.trueVal) {
        data.selectedInput.value.trueVal = data.trueVal;
      }

      data.selectedInput.value.val = data.val;
    };

    // Input在blur後清除紅外框
    const clearValidity = (input) => {
      input.value.isValid = true;

      if (password.value.val === "") {
        password.value.isFocused = false;
      }
    };

    // Input獲得focus時將紅框消除
    const setFocus = (selectedInput) => {
      selectedInput.value.isValid = true;

      if (selectedInput.value?.isFocused === false) {
        password.value.isFocused = true;
      }
    };

    // Toggle是否能看見密碼
    const toggleVisibility = (bool) => {
      password.value.isVisible = bool;
    };

    // 監聽password的值是否有包含1個數字
    watch(
      () => password.value.trueVal,
      (newVal) => {
        if (atLeastOneNumberRule.test(newVal)) {
          password.value.isOneNumberActive = true;
        } else {
          password.value.isOneNumberActive = false;
        }
      }
    );

    // 監聽password的值是否達到8個位元長度
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

    // 正規表達式驗證input資料
    const namesRule = /^[\u4e00-\u9fa5]+$|^[a-zA-Z\s]+$/;
    const passwordRule = /[a-zA-Z0-9]{8,}/;
    const atLeastOneNumberRule = /[0-9]/;

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
      if (!passwordRule.test(password.value.trueVal)) {
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

      router.push("/loggedInSuccessfully");
    };

    return {
      firstName,
      lastName,
      email,
      password,
      agreement,
      updateEnteredTerm,
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

.create-account {
  width: 100%;
}

// Already have account notification樣式
.already-have-account {
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

// Form樣式
.form-control {
  position: relative;
  margin-bottom: 0.8rem;
  margin-top: auto;
  overflow: hidden;

  // Password check樣式
  .password__check {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 3px;
    gap: 5px;
  }

  // 隱藏預設checkbox樣式
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

  // 新增Pseudo element樣式設定
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
}
</style>
