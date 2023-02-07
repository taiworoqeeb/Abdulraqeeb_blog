<template>
    <main>
        <header>
            <div class="logo">
                <img :src="logo" alt="logo"/>
            </div>
            <div class="mylogo">
                <img :src="mylogo" alt="mylogo">
            </div>
        </header>
        <body>
            <form @submit.prevent>
                <h1>Sign in</h1>
                <label> Email/Username: </label>
                <input type="text" placeholder="Email/Username"  v-model="User.email" required>
                <label>Password: </label>
                <input type="password" id="password" placeholder="Please enter your password"  v-model="User.password" required>
                <div>
                    <label> Show password: </label>
                    <input type="checkbox" @click="togglePassword">
                </div>
                <div class="submit">
                    <button @click="handleSubmit"> Login </button>
                </div>
            </form>
        </body>
    
    </main>
   
</template>

<script setup>
import Swal from 'sweetalert2';
import logo from '@/assets/logo_light.png'
import mylogo from '@/assets/mylogo.png'
import {useUserStore} from '@/store/User'
import router from '@/router';
import { onMounted, reactive, computed } from 'vue';
import {useHead} from "@vueuse/head"
const siteData = reactive({
  title: "Abdulraqeeb's blog",
  description: "My personal Blog"
})

const togglePassword = () =>{
    var x = document.getElementById('password')
    if(x.type === 'password'){
        x.type = 'text'
    }else{
        x.type = 'password'
    }
}

onMounted(()=>{
    if(localStorage.Token && localStorage.User){
        router.push('/admin/dashboard')
    }
})

const User = useUserStore()

    const handleSubmit = () =>{
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
        
        User.loginUser().then(() =>{
            if(User.data){
                localStorage.setItem('User', JSON.stringify(User.data))
                localStorage.setItem('Token', User.data.token)
            }
            
            if(User.status && User.message){
                Toast.fire({
                    icon: 'success',
                    title: User.message
                }).then(() =>{
                    router.push('/admin/dashboard')
                })
            }else if(!User.status && User.message){
                Toast.fire({
                    icon: 'error',
                    title: User.message
                })
            }

            if(User.error){
                 Toast.fire({
                    icon: 'error',
                    title: User.error
                })
            }
        })
    }

 useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
        {
          property: "og:title",
          content: "Abdulraqeeb Taiwo | Fullstack Developer"
        },
        {
          property: "og:site_name",
          content: "Abdulraqeeb's Blog"
        },
        {
          property: "og:url",
          content: "/"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:image",
          itemProp: "image",
          content: "/og.png"
        },
        {
          property: "og:locale",
          content: "en:GB"
        },
        {
          property: "og:image:width",
          content: "1200"
        },
        {
          property: "og:image:height",
          content: "600"
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:image:alt",
          content: "Abdulraqeeb Taiwo"
        },
        {
          name: "twitter:title",
          content: "Abdulraqeeb's blog"
        },
        {
          name: "twitter:description",
          content: "Welcome to my personal Blog"
        },
        {
          name: "twitter:image",
          content: "/og.png"
        }
      ],
    })
</script>

<style scoped>

body{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
    max-width: 100%;
}

form{
    width: 420px;
    max-width: 100%;
    margin: 130px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 40px;
}

form h1{
    font-size: xx-large;
    color: #000;
    text-transform: uppercase;
    text-align: center;
}

label{
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 18px;
    color: #555;
    text-indent: 12px;
}
input[type="checkbox"]{
    display: inline-block;
    width: 16px;
    margin-left: 10px;
    margin-top: 0px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 10px;
}
input::placeholder{
    color: #ddd;
    text-indent: 12px;
}
button{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
.submit{
    text-align: center;
}
.error{
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
@media screen and (max-width: 991px) {
    form{
        width: 100%;
        height: inherit;
    }

    form h1{
        font-size: medium;
    }
    label{
        font-size: 0.5rem;
    }

    input{
        width: 100%;
        font-size: medium;
    }
}

</style>