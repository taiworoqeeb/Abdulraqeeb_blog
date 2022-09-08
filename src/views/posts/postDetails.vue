<template>
<main>
    <body>
            <div class="post relative overflow-hidden">
            <div class="backButton" :class="{dark: darkPost === 'dark'}">
                <button @click="back"><font-awesome-icon icon="fa-solid fa-arrow-left-long" /> Back</button>
            </div>

            <div class="view flex flex-col mb-20 items-center max-w-4xl w-full mx-auto">
                <article v-if="post" :key="post._id" >
                    <innerPost :post="post" :markDown="markDown" />
                    <div class="grid md:grid-cols-2 lg:-mx-24 mt-12">
                        <div v-if="previousPost" :key="previousPost._id" class=" previous " :class="{dark: darkPost === 'dark'}">
                        <router-link :to="{name: 'Post', params:{id: previousPost._id}}"  >
                            <p class="uppercase text-gray-500 px-5 mb-4 dark:text-white dark:opacity-60"> Previous </p>
                            <h4 class="text-sm  text-gray-700 mb-1 px-5 dark:text-white">
                            {{previousPost.title}}
                            </h4>
                            <font-awesome-icon class=" arrow mx-auto px-5 md:mr-0 mt-auto" :class="{dark: darkPost === 'dark'}" icon="fa-solid fa-arrow-left-long" />
                        </router-link>
                        </div>

                        <div v-if="nextPost" :key="nextPost._id" class="next" :class="{dark: darkPost === 'dark'}" >
                        <router-link :to="{name: 'Post', params:{id: nextPost._id}}"  >
                            <p class="uppercase text-gray-500 mb-4 px-5 dark:text-white dark:opacity-60"> Next</p>
                            <h4 class="text-sm  text-gray-700 mb-1 px-5 dark:text-white">{{nextPost.title}}</h4>
                            <font-awesome-icon class=" arrow mt-auto px-5 mx-auto md:ml-0" :class="{dark: darkPost === 'dark'}" icon="fa-solid fa-arrow-right-long" />
                        </router-link>
                    </div>
                </div>
                </article>
            </div>
            <div class="card" v-if="!post">
                <img v-if="darkPost!== 'dark'" src="../../assets/loading.gif" alt="loading"/>
                <img v-if="darkPost === 'dark'" src="../../assets/loading_light.gif" alt="loading"/>
                </div>
        
        </div>
        </body>
        
</main>
    
    
</template>

<script setup>
import {getPostId, getNextPost, getPreviousPost} from '../../composite/Posts'
import {marked} from 'marked'
import innerPost from './innerPost.vue'
import {ref} from 'vue'
import router from '@/router'
import Theme from '../../components/theme.vue'
import hljs from "highlight.js"
import jsHighlight from "highlight.js/lib/languages/javascript";
        const props = defineProps({
            id: String
        })

        var id = props.id
        
        var nextPost = ref(null)
        var previousPost= ref(null)
        var darkPost = ref('')

        const altPost = async()=>{
            nextPost.value = await getNextPost(id);
            previousPost.value = await getPreviousPost(id);

        }
        altPost()

        var {post, error, load} = getPostId(id)

        load()

        hljs.registerLanguage("javascript", jsHighlight)
        hljs.highlightAll()

        function markDown(content){
            
            return marked(content, {
            renderer: new marked.Renderer(),
            highlight: function(content) {
                return hljs.highlightAuto(content).value;
            },
            langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        })
        }

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
            post,
            error,
            markDown,
            nextPost,
            previousPost,
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
    margin: 46%;
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
</style>