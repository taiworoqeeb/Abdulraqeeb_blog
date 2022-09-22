<template>
  <router-view v-slot="{Component, route}">
      <transition name="fade" mode="out-in">
        <div :key="route.path">
          <component :is="Component"  />
        </div>
      </transition>
  </router-view>
</template>

<script setup>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  text-align: center;
  color: #2c3e50;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);

  }

body.dark {
  --tw-bg-opacity: 1;
    background-color: rgb(13 36 56 / var(--tw-bg-opacity));
}

.dark{
  --tw-bg-opacity: 1;
    background-color: rgb(13 36 56 / var(--tw-bg-opacity));
}

</style>
