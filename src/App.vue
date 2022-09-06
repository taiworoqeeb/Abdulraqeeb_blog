<template>
  <nav :class="{dark: state == true}">
  <div class="logo">
  <router-link v-if="state" to="/">
  <img src="./assets/logo.png" alt="logo"/>
  </router-link>
   <router-link v-else to="/">
  <img src="./assets/logo_light.png" alt="logo"/>
  </router-link>
  </div>
  
  <div class="mylogo">
   <router-link v-if="state" to="/"><img src="./assets/mylogo2.png" alt="mylogo"/></router-link>
  <router-link v-else to="/"><img src="./assets/mylogo.png" alt="mylogo"/></router-link>
      
  </div>
  
  <div class="links" :class="{black: state == true}">
     <router-link to="/">Home</router-link>
     <router-link :to="{name: 'about'}">About</router-link>
  </div>
  </nav>
  <router-view v-slot="{Component, route}">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>

  
</template>

<script setup>
import {ref} from 'vue'

    var state = ref('')
    if(localStorage.theme === 'dark'){
      state.value = true
    }else{
      state.value = false
    }
    

    defineExpose({
      state
    })


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dark{
  --tw-bg-opacity: 1;
    background-color: rgb(13 36 56 / var(--tw-bg-opacity));
}

nav{
  display: inline-block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

}
nav .links {
  padding: 15px;
  text-align: right;
  justify-content: right;

}

nav .logo{
  justify-content: left;
  width: 50px;
  height: 0px;
  margin: 5px;
  
  
}

nav .mylogo{
  justify-content: center;
  width: 35vh;
  max-width: auto;
  height: 0px;
  display: inline-block;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
}


nav .links a {
  font-weight: bold;
  color: black;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav .links.black a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav .links a.router-link-exact-active {
  color: black;
  text-decoration: 3px underline solid black;
}
nav .links.black a.router-link-exact-active {
  color: white;
  text-decoration: 3px underline solid white;
}

nav .links a:hover{
  color: rgb(94, 48, 219);
}
nav .links a.router-link-exact-active:hover{
  color: rgb(94, 48, 219);
  text-decoration: 3px underline solid rgb(94, 48, 219);
}

</style>
