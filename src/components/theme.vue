<template>
    
     <div class="theme" :class="{ black: code === 'dark'}">
      <button @click="setDark" v-if="!darkTheme" > <font-awesome-icon icon="fa-solid fa-moon" :class="{black: code === 'dark'}" /> </button>
      <button @click="setLight" v-else > <font-awesome-icon icon="fa-solid fa-sun" :class="{black: code === 'dark'}" /> </button>
    </div>
    
  
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
    font-size: larger;
    color: #1B2737;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

}
.theme.black button{
    text-decoration: none;
}
.black{
    color: white;
}

</style>