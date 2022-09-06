<template>
  <main class="w-full ">
      <div v-if="posts" class="home m-8 p-10 text-left divide-y divide-blue-200 dark:divide-blue-700 " :class="{dark: theme === 'dark'}">
        <div class="submit">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css">
          <input class="light" :class="{dark: theme === 'dark'}" type="text" v-model="search" placeholder="&#xF002; Search" style="font-family: Arial, 'Font Awesome 5 Free'"/>
        </div>
          <ul class="homelist">
            <li v-for="post in onSearch()" :key="post._id" class="w-flil ">
                  <router-link :to="{name: 'Post', params:{id: post._id}}" class="text-blue-900 dark:text-white">
                      <img :src="post.image_url" alt="postImage">
                    </router-link>
                    <div class="info">
                      <h1 class=" title text-2xl font-bold leading-8 tracking-tight">
                      <router-link :to="{name: 'Post', params:{id: post._id}}" class=" dark:text-white">
                        {{post.title}}
                      </router-link></h1>
                      <p class="prose max-w-none text-gray-500 dark:text-gray-400">{{post.desc}}</p>
                      <router-link :key="post._id" :to="{name: 'Post', params:{id: post._id}}" class="text-base font-medium leading-6">
                        <p class=" readmore text-gray-600 dark:text-white hover:text-gray-400 dark:hover:text-gray-400">Read more...</p>
                      </router-link>
                    </div>
                 
                </li> 
          </ul>
              
              </div>

            <div class="card" v-else>
              <img v-if="theme !== 'dark'" src="../assets/loading.gif" alt="loading"/>
              <img v-if="theme === 'dark'" src="../assets/loading_light.gif" alt="loading"/>
            </div>
            <div v-if="posts">
              <Theme />
            </div>
  </main>
  
 
</template>

<script setup>
import {ref, onMounted} from 'vue'
import router from '@/router'
import {getPosts} from '../composite/Posts'
import Theme from '../components/theme.vue'

    const { posts, error, search, load, onSearch} = getPosts();
    
    load()

    var theme = ref(null)
    
    
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        theme.value = 'dark'
    }else{
      theme.value = 'light'
    }

    defineExpose({
      posts, 
      error,
      search,
      onSearch,
      theme,
    })
 
</script>

<style scoped>

  .card{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 46%;
  }
  .home{
    display: block;
    margin: 10px auto;
  }
  .home ul{
    border-top: none;
    padding: 20px;
    margin: 10px auto;
    max-width: 100vh;
  }

  .home li{
    border-top: 1px solid #1B2737;
    border-radius: 8px;
    margin: 10px auto;
    padding: 20px;
    display: flex;
  }

  .home.dark li{
    border-top: 1px solid white;
  }
  .home li img{
    display: inline;
    justify-content: center;
    max-width: 500vh;
    height: 20vh;
    border-radius: 10px;
    border-width: 3px;
    border-color: #1B2737;
    
  }

  .home.dark li img{
    border-color: white;
    
  }
  
  .home .info{
    
    margin: 8px;
    padding: 8px;
  }
  .home .info .title{
    color: #1B2737;
  }
  .submit input{
    display: flex;
    padding: 10px 6px;
    width: 25%;
    margin-left: 70%;
    margin-bottom: 50px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #1B2737;
    color: #1B2737;
    border-radius: 50px;
    text-indent: 20px;

  }
   .submit input.dark{
    background-color: #1B2737;
    border-bottom: 1px solid white;
  }
  .submit input::placeholder{
    color: #1B2737;
    opacity: 1;
  }

  .submit input.dark::placeholder{
    color: white;
    opacity: 1;
  }

</style>
