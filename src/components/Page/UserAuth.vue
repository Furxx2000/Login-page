<template>
  <base-card>
    <section class="previous-page">
      <base-button link class="previous-page__link" mode="flat">
        <svg-icon icon-class="arrow_back"></svg-icon>
        <p class="previous-page__text">Back</p>
      </base-button>
    </section>
    <section class="create-account">
      <h2>Start from free</h2>
      <h1>Create an account</h1>
      <div class="sign-up">
        <base-button link class="sign-up__link">
          <svg-icon icon-class="google"></svg-icon>
          <span class="sign-up__text">Sign up with Google</span>
        </base-button>
        <base-button link class="sign-up__link">
          <svg-icon icon-class="facebook"></svg-icon>
          <span class="sign-up__text">Sign up with Facebook</span>
        </base-button>
      </div>
      <div class="email-registration">
        <div class="title">
          <p class="title__text">Or use your email for registration</p>
          <div class="title__hori-line"></div>
        </div>
        <registration-form></registration-form>
      </div>
    </section>
  </base-card>
</template>

<script>
import RegistrationForm from "../registration/RegistrationForm.vue";

export default {
  components: { RegistrationForm },
  setup() {},
};
</script>

<style lang="scss" scoped>
.previous-page {
  display: flex;
  align-items: center;

  .flat:hover,
  .flat:active {
    .previous-page__text {
      font-weight: 700;
    }
  }

  &__text {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }
}

.create-account {
  max-width: 70%;
  margin: 0 auto;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  h1 {
    margin-top: 0;
  }

  .sign-up {
    display: flex;
    justify-content: space-between;
    gap: 25px;

    &__link {
      text-decoration: none;
      flex: 1;
      height: 55px;

      &:hover,
      &:active {
        color: #ffffff;
        border: 1px solid #3c71ff;
        box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);

        .svg-icon {
          fill: #ffffff;
        }
      }

      .svg-icon {
        width: 23px;
        height: 23px;
        margin-right: 0.5rem;
        fill: #3c71ff;
      }
    }

    &__text {
      font-size: 13px;
      font-weight: 600;
    }
  }

  .email-registration {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 9px;
      margin: 1rem 0;

      &__text {
        font-size: 14px;
        font-weight: 600;
      }

      &__hori-line {
        flex-grow: 1;
        border-bottom: 1px solid black;
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .previous-page {
    margin-bottom: 2rem;
  }

  .create-account {
    max-width: 100%;

    h1 {
      font-size: 30px;
    }
    .sign-up {
      &__link {
        .svg-icon {
          width: 21px;
          height: 21px;
        }
      }

      &__text {
        font-size: 10px;
      }
    }

    .email-registration {
      .title {
        &__text {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
