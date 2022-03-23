<template>
  <section class="previous-page">
    <base-button link to="/login" class="previous-page__link" mode="flat">
      <svg-icon icon-class="arrow_back"></svg-icon>
      <p class="previous-page__text"><slot></slot></p>
    </base-button>
  </section>
</template>

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
</style>
