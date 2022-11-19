<template>
  <div class="navBar">
<header>
  <div class="logo" key="logo">
    <router-link v-if="state" to="/">
    <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <router-link v-else to="/">
    <img src="@/assets/logo_light.png" alt="logo">
    </router-link>
    </div>
    
    <div class="mylogo" key="mylogo">
    <router-link v-if="state" to="/"><img src="@/assets/mylogo2.png" alt="mylogo"></router-link>
    <router-link v-else to="/"><img src="@/assets/mylogo.png" alt="mylogo"></router-link>
    </div>
   
    
</header>
  <nav :class="{dark: state == true}">
   
  <div class="links" :class="{black: state == true}" key="links">
  <div class="theme-class">
      <Theme />
    </div>
     <router-link to="/">Home</router-link>
     <router-link :to="{name: 'about'}">About</router-link>
    <a href="https://taiworoqeeb.tech" target="_blank" rel="noreferrer noopener">Portfolio</a>
  </div>
  </nav>
</div>

</template>

<script setup>
    import {ref} from 'vue';
    import Theme from './theme.vue'


    //  var viewMode = getCookie("view-mode");
    // if(viewMode == "desktop"){
    //     viewport.setAttribute('content', 'width=1024');
    // }else if (viewMode == "mobile"){
    //     viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
    // }

    var state = ref('')
     const appTheme = localStorage.getItem('theme');
    if(appTheme ==='dark'){
      state.value = true
    }else{
      state.value = false
    }
    

    defineExpose({
      state
    })

</script>

<style>

nav{
  display: inline-flex;
  width: 30%;
  max-width: 100%;
  margin-left: 70%;
  margin-right: auto;

}
nav .links {
  padding: 10px;
  max-width: 100%;
  text-align: right;
  justify-content: right;
  display: inline-flex;

}

header .logo{
  justify-content: left;
  width: 50px;
  height: 0px;
  margin: 5px;
  cursor: pointer;
  
  
}

header .mylogo{
  justify-content: center;
  width: 200px;
  max-width: auto;
  height: 0px;
  display: inline-block;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

nav .links .theme-class{
  margin-right: 3%;
  margin-top: 2%;
  padding-right: 4px;
  display: inline-flex;
}



nav .links a {
  display: inline-flex;
  font-weight: bold;
  color: black;
  text-decoration: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}

nav .links.black a {
  display: inline-flex;
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 5px;
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

@media screen and (max-width: 991px) {
  div.navBar{
    max-width: 100%;
  }
 header .logo{
    width: 40px;
  }

  header .mylogo{
    width: 150px;
    margin-right: 90px;
  }

  nav .links{
    font-size: small;
    
  }
}

</style>