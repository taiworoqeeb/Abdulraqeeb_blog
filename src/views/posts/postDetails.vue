<template>
<navigation/>
<main>
    <body :class="{dark: darkPost === 'dark'}">
            <div class="post" :class="{dark: darkPost === 'dark'}">
            <div class="backButton" :class="{dark: darkPost === 'dark'}">
                <button @click="back"><font-awesome-icon icon="fa-solid fa-arrow-left-long" /> Back</button>
            </div>

            <div class="view flex flex-col mb-20 items-center w-full mx-auto">
                <article v-if="Posts.post" :key="Posts.post._id" >
                    <innerPost />
                    <div class="nav grid md:grid-cols-2 lg:-mx-24 mt-12">
                        <div v-if="Posts.previousPost" :key="Posts.previousPost._id" class=" previous " :class="{dark: darkPost === 'dark'}">
                        <router-link :to="{name: 'Post', params:{id: Posts.previousPost._id}}"  >
                            <p class="uppercase text-gray-500 px-5 mb-4 dark:text-white dark:opacity-60"> Previous </p>
                            <h4 class="text-sm  text-gray-700 mb-1 px-5 dark:text-white">
                            {{Posts.previousPost.title}}
                            </h4>
                            <font-awesome-icon class=" arrow mx-auto px-5 md:mr-0 mt-auto" :class="{dark: darkPost === 'dark'}" icon="fa-solid fa-arrow-left-long" />
                        </router-link>
                        </div>

                        <div v-if="Posts.nextPost" :key="Posts.nextPost._id" class="next" :class="{dark: darkPost === 'dark'}" >
                        <router-link :to="{name: 'Post', params:{id: Posts.nextPost._id}}"  >
                            <p class="uppercase text-gray-500 mb-4 px-5 dark:text-white dark:opacity-60"> Next</p>
                            <h4 class="text-sm  text-gray-700 mb-1 px-5 dark:text-white">{{Posts.nextPost.title}}</h4>
                            <font-awesome-icon class=" arrow mt-auto px-5 mx-auto md:ml-0" :class="{dark: darkPost === 'dark'}" icon="fa-solid fa-arrow-right-long" />
                        </router-link>
                        </div>
                   
                    </div>
                 <comment />
                </article>
            </div>
            <div class="card" v-if="!Posts.post">
                <img v-if="darkPost!== 'dark'" src="../../assets/loading.gif" alt="loading"/>
                <img v-if="darkPost === 'dark'" src="../../assets/loading_light.gif" alt="loading"/>
            </div>
        </div>
        </body>
        
</main>
    
    
</template>

<script setup>
import {getPostId, getNextPost, getPreviousPost} from '../../composite/Posts'
// import {marked} from 'marked'
import innerPost from './innerPost.vue'
import {ref, onMounted} from 'vue'
import router from '@/router'
import navigation from '@/components/navigation.vue';
import {useGetPostStore} from '@/store/Post'
import comment from './comment.vue';



var Posts = useGetPostStore()

        const props = defineProps({
            id: String
        })

        var id = props.id

        onMounted(()=>{
            Posts.id = id
            Posts.getPostById()
            Posts.getContPost()
        })

        var darkPost = ref('')


         const appTheme = localStorage.getItem('theme');
        if(appTheme === 'dark'){
            darkPost.value = 'dark'
        }else{
            darkPost.value = 'light'
        }

        function back(){
            router.go(-1)
        }
        
        defineExpose({
            // post,
            // error,
            // nextPost,
            // previousPost,
            darkPost,
            back
        })
 
</script>

<style scoped>

.backButton{
    justify-content: left;
    align-items: flex-start;
    text-align: left;
    margin: 15px;
    font-size: large;
    font-weight: bold;
    border-radius: 8px;
    border-bottom: 1px solid #1B2737;
    width: 90px;
    color: #1B2737;
}

.backButton.dark{
    color: white;
    border-bottom: 1px solid white;
}
.card{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25%;
  }
 .previous{
    color: #333;
    border: 4px solid#1B2737;
    border-radius: 20px;
    text-align: right;
    padding: 8px;
    margin: 5px;
    
 }
 .next {
    text-align: left;
    color: #333;
    padding: 8px;
    border: 4px solid #1B2737;
    border-radius: 20px;
    margin: 5px;
   
 }

 .next.dark {
    border: 4px solid white;
 }
 .previous.dark {
    border: 4px solid white;
 }

 .arrow{
    color: #004aad;
 }

 .arrow.dark{
    color: white;
 }

 .post{
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    margin: 100px auto;
    max-width: 100%;
 }

 @media screen and (max-width: 991px) {
    
    .view{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        max-width: 150%;
    }

    .nav{
        width: 50%;
        margin-left: 20px;
    }
   
 }

</style>