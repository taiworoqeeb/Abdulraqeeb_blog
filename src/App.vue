<template>
<body>

  <router-view v-slot="{Component, route}">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>

</body> 
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

.dark{
  --tw-bg-opacity: 1;
    background-color: rgb(13 36 56 / var(--tw-bg-opacity));
}

</style>
