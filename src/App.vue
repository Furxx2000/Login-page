<template>
  <router-view v-slot="{ Component }">
    <transition name="router" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Inter', sans-serif;
}

body {
  background-color: #f1f5ff;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.router-enter-active {
  transition: all 0.5s ease-out;
}

.router-leave-active {
  transition: all 0.5s ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
