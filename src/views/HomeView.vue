<template>
  <navigation />
  <main class="w-full homelist">
      <div v-if="Posts.posts" class="home text-left divide-y divide-blue-200 dark:divide-blue-700 " :class="{dark: theme === 'dark'}">
          <div class="submit">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css">
            <input class="light" :class="{dark: theme === 'dark'}" type="text" v-model="Posts.search" placeholder="&#xF002; Search article" style="font-family: Arial, 'Font Awesome 5 Free'"/>
          </div>
            <ul class="homelist">
              <li v-for="post in Posts.searchState" :key="post._id" class="w-flil ">
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
            <div class="recentDiv">
              <p style="float: right;margin-top: 20px;"> 
                  <button v-if="Posts.current_page > 1" @click="Posts.prevPage" class="prev" >Previous</button> 
                  <button v-if="(Posts.current_page * Posts.size) < Posts.posts.length" @click="Posts.nextPage" class="next">Next</button>
                </p>
            </div>
           
          </div>

              <div class="card" v-else>
                <img v-if="theme !== 'dark'" src="../assets/loading.gif" alt="loading"/>
                <img v-if="theme === 'dark'" src="../assets/loading_light.gif" alt="loading"/>
              </div>
  </main>
  
 
</template>

<script setup>
import dayjs from 'dayjs'
import {onMounted, reactive, computed, ref} from 'vue'
import router from '@/router'
import {getPosts} from '@/composite/Posts'
import navigation from '@/components/navigation.vue';
import {useGetPostStore} from '@/store/Post'
import {useHead} from "@vueuse/head"
const siteData = reactive({
  title: "Abdulraqeeb's blog",
  description: "My personal Blog"
})
 

const Posts = useGetPostStore()

    // const { posts, error, search, load, onSearch} = getPosts();
    
    // load()
    
    onMounted(() =>{
      Posts.getPosts()
    })

    // computed(()=>{
    //   function sortedPost(){
    //     return Posts.displayPost.filter((row, index) =>{
    //     let start = (Posts.current_page - 1) * Posts.size;
    //     let end = Posts.current_page * Posts.size;
    //     if(index >= start && index < end) return true
    //   })
    //   }
    // })
    

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

  .recentDiv{
    margin-right: 2%;
    float: right;
    border: none;
  }

  .recentDiv .prev{
    border:1px solid #ddd;
    border-radius: 10px;
    padding: 5px 30px;
    margin-right: 25px;
  }
  .recentDiv .prev:hover{
    background: #ddd;
  }
  .recentDiv .next:hover{
    background: #ddd;
  }

  .home.dark .recentDiv .prev:hover{
     background: var(--dark-alt);
  }
  .home.dark .recentDiv .next:hover{
     background: var(--dark-alt);
  }

  .home.dark .recentDiv .prev{
      color: whitesmoke
  }
  .home.dark .recentDiv .next{
    color: whitesmoke
  }
  .recentDiv .next{
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 5px 41px;
  }

  .card{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25%;
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
    max-width: 100%;
    width: 200px;
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
    max-width: 100%;
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

  @media screen and (max-width: 991px) {
    main.homelist{
      align-items: center;
      width: 110%;
      max-width: max-content;
      margin: 0 0 0 0;
    }

    .home{
      width: 100%;
      max-width: 100%;
    }

    .home .submit{
      width: 98%;
      margin-right: 20%;
    }

    .home .submit input{
      width: 30%;
    }

    .home ul{
      width: 100%;
      max-width: 100%;
    }
    .home li{
      width: 100%;
      max-width: 100%;
      display: inline-block;
      justify-content: center; 
      align-items: center;
    }

    .home li img{
      width: 100%;
      height: 80%;
      max-width: 100%;
      justify-content: center;
      align-items: center;
      display: block;
      
    }

    .home .info .title{
      text-align: center;
    }

    .home .info .tag{
      display: inline-block;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

  }

</style>
