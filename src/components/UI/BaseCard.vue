<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 5px rgba(222, 231, 255, 0.25);
  border-radius: 20px;
  margin: 60px auto;
  padding: 2.3rem 2rem;
  max-width: 40rem;
}

@media only screen and (max-width: 425px) {
  .card {
    box-shadow: none;
    height: 110vh;
    padding: 34px 20px;
    margin: 0;
    border-radius: 0;
  }
}
</style>
