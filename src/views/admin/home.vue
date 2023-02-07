<template>
    <main>
        <header>
         <div class="mylogo">
                <img :src="mylogo" alt="mylogo">
        </div>
        </header>
    </main>
</template>

<script setup>
import mylogo from '@/assets/mylogo.png'
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() =>{
    if(!localStorage.Token && !localStorage.User){
        router.push('/admin/login')
    }
})

</script>