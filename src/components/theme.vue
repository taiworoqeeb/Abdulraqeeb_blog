<template>
    <footer> 
     <div class="theme" :class="{ black: code === 'dark'}">
      <button @click="setDark" :disabled="darkTheme" ><font-awesome-icon icon="fa-solid fa-moon" :class="{black: code === 'dark'}" /></button>
      <button @click="setLight" :disabled="lightTheme" ><font-awesome-icon icon="fa-solid fa-sun" :class="{black: code === 'dark'}" /></button>
    </div>
    </footer>
  
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'


        var code = ref(null)
        var darkTheme = ref('')
        var lightTheme = ref('')
        var appTheme = localStorage.getItem('theme');

        if(appTheme === null){
            localStorage.setItem('theme', 'light')
        }
        
        if(appTheme === 'light'){
            code.value = 'light'
            lightTheme.value = true
        }else{
             lightTheme.value = false
        }

        if(appTheme === 'dark'){
            code.value = 'dark'
            darkTheme.value = true
        }else{
             darkTheme.value = false
        }

   

    function setDark(){
        
        if(appTheme === 'light' || !appTheme || appTheme === null){
            localStorage.setItem('theme', 'dark')
            darkTheme.value = true
            lightTheme.value = false
            router.go(0)
        }
      
    }

    function setLight(){
        
        if(appTheme === 'dark' || !appTheme || appTheme === null){
            localStorage.setItem('theme', 'light')
            
            darkTheme.value = false
            lightTheme.value = true
            router.go(0)
        }
     
    }

    if(appTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        document.documentElement.classList.add('dark')
        document.getElementById('app').classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
      document.getElementById('app').classList.remove('dark')
    }
    // console.log(code.value)

    defineExpose({
      setDark,
      setLight,
      darkTheme,
      lightTheme,
      code
    })

</script>

<style>
.theme button{
  color: #1B2737;
  padding: 10px;
  border: 2px solid #1B2737;
  border-radius: 15px;
  text-decoration: none;
  margin: 2px;
}

.theme.black button{
    padding: 10px;
    border: 2px solid white;
    border-radius: 15px;
    text-decoration: none;
    margin: 2px;
}

.black{
    color: white;
}

button[disabled]{
    opacity: 0.2;
}
</style>