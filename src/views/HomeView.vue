<template>
  <navigation />
  <main class="w-full homelist">
      <div v-if="Posts.posts" class="home text-left divide-y divide-blue-200 dark:divide-blue-700 " :class="{dark: theme === 'dark'}">
          <div class="submit">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css">
            <input class="light" :class="{dark: theme === 'dark'}" type="text" v-model="Posts.search" placeholder="&#xF002; Search" style="font-family: Arial, 'Font Awesome 5 Free'"/>
          </div>
            <ul class="homelist">
              <li v-for="post in Posts.searchedPost" :key="post._id" class="w-flil ">
                    <router-link :to="{name: 'Post', params:{id: post._id}}" class="text-blue-900 dark:text-white">
                        <img :src="post.image_url" alt="postImage">
                      </router-link>
                      <div class="info">
                        <h1 class=" title text-xl font-bold leading-8 tracking-tight">
                        <router-link :to="{name: 'Post', params:{id: post._id}}" class=" dark:text-white">
                          {{post.title}}
                        </router-link></h1>
                        <hr class="titleLine">
                        <div v-if="post.tags" v-for="tag in post.tags" :key="tag" class="tag">
                          <span>#{{tag.toLowerCase()}}</span>
                        </div>
                        <p class="date">{{format_date(post.createdAt)}}</p>
                        <p class="desc prose max-w-none text-gray-500 dark:text-gray-400">{{post.desc}}</p>
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
  </main>
  
 
</template>

<script setup>
import dayjs from 'dayjs'
import {onMounted, ref} from 'vue'
import router from '@/router'
import {getPosts} from '@/composite/Posts'
import navigation from '@/components/navigation.vue';
import {useGetPostStore} from '@/store/Post'

const Posts = useGetPostStore()

    // const { posts, error, search, load, onSearch} = getPosts();
    
    // load()

  const format_date = (value) => {
      if (value) {
          const date = dayjs(value);
          return date.format('MMM D, YYYY');
      }
    }

    var theme = ref(null)
     const appTheme = localStorage.getItem('theme');
    
    if(appTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        theme.value = 'dark'
    }else{
      theme.value = 'light'
    }

    
    

    defineExpose({
      // posts, 
      // error,
      // search,
      // onSearch,
      theme,
    })
 
</script>

<style scoped>

  .example-six .pagination-container {
  column-gap: 10px;
  align-items: center;
  }
  .example-six .paginate-buttons {
    height: 35px;
    width: 35px;
    cursor: pointer;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    color: black;
  }

  .example-six .back-button,
  .example-six .next-button {
    background-color: black;
    color: white;
    border-radius: 8px;
    height: 45px;
    width: 45px;
  }
  .example-six .active-page {
    background-color: #e5e5e5;
  }
  .example-six .paginate-buttons:hover {
    background-color: #f5f5f5;
  }
  .example-six .active-page:hover {
    background-color: #e5e5e5;
  }

  .example-six .back-button svg {
    transform: rotate(180deg) translateY(-2px);
  }
  .example-six .next-button svg {
    transform: translateY(2px);
  }

  .example-six .back-button:hover,
  .example-six .next-button:hover {
    background-color: rgb(45, 45, 45);
  }

  .example-six .back-button:active,
  .example-six .next-button:active {
    background-color: rgb(85, 85, 85);
  }

  .card{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 46%;
  }
  .home{
    padding-top: 70px;
    display: block;
    margin: 10px auto;
    max-width: 75%;
    margin-bottom: 80px;
  }
  .home ul{
    border-top: none;
    padding: 20px;
    margin: 10px auto;
    max-width: 100%;
  }

  .home li{
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 5px auto;
    padding: 20px;
    display: flex;
  }

  .home li:hover{
    background: #ddd;
  }

  .home.dark li:hover{
    background: var(--dark-alt);
  }

  .home.dark li{
    border-top: 1px solid white;
  }
  .home li img{
    margin-top: 9%;
    display: inline-flex;
    justify-content: center;
    max-width: 200px;
    height: 150px;
    border-radius: 10px;
    border-width: 3px;
    border-color: #1B2737;
    
  }

  .home li .date{
    font-size: smaller;
    font-weight: bold;
  }

  .home.dark li .date{
   color: #fff;
  }
  .home li .titleLine{
      margin: 4px;
  }

  .home.dark li img{
    border-color: white;
    
  }
  
  .home .info{
    margin: 2px;
    padding: 8px;
    margin-left: 10px;
  }
  .home .info .title{
    color: #1B2737;
  }
  .home .info p.desc{
    font-size:small;
  }

  .home .info .readmore{
    font-size: small;
    font-style: italic;
  }

  .home .info .tag{
    display: inline-block;
    margin: 10px 10px 10px 0;
    padding: 6px 8px;
    background: #eee;
    border-radius: 20px;
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #1B2737;
    
  }

  .home.dark .info .tag{
    background: #1B2737;
    color: #eee;
  }
  .submit input{
    display: flex;
    padding: 10px 6px;
    width: 25%;
    margin-left: 70%;
    margin-bottom: 50px;
    box-sizing: border-box;
    border: none;
    --tw-bg-opacity: 1;
    border-bottom: 1px solid rgb(13 36 56 / var(--tw-bg-opacity));
    color: rgb(13 36 56 / var(--tw-bg-opacity));
    border-radius: 50px;
    text-indent: 20px;

  }

  .submit input:hover{
    background: #ddd;
  }

  .submit input.dark:hover{
    background: var(--dark-alt);
  }
   .submit input.dark{
    --tw-bg-opacity: 1;
    background-color: rgb(13 36 56 / var(--tw-bg-opacity));
    color: #fff;
    border-bottom: 1px solid white;
  }
  .submit input::placeholder{
    color: #1B2737;
    opacity: 1;
  }

  .submit input.dark::placeholder{
    color: gray;
    opacity: 1;
  }

</style>
