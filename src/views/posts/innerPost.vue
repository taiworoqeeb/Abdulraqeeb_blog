<template>
    <main v-if="Posts.post" class="shortPost w-full " :class="{dark: state == true}">
        <header>
            <img class="img" :src="Posts.post.image_url">
            <br/>
        </header>
        <section class="innerpage">
            <h1 class="text-2xl font-bold md:text-3xl dark:text-white text-center mb-5"> {{Posts.post.title}}</h1>
            
            <div v-if="Posts.post.tags" v-for="tag in Posts.post.tags" :key="tag" class="tag" :class="{dark: state == true}">
                <span>#{{tag.toLowerCase()}}</span>
            </div>
            <hr>
            <p class="date">Date: {{format_date(Posts.post.createdAt)}}</p>
            <hr>
            <p class=" desc text-xl dark:text-white mb-4 md:text-xl max-w-xl sm:text-l text-justify">{{Posts.post.desc}}</p>
        </section>
            <article  class="article text-justify text-white dark:text-white" :class="{dark: state == true}" >
                <MdEditor 
                :model-value="Posts.post.content"
                preview-only 
                language="en-US"
                :theme="`${state ? 'dark' : 'light'}`"
                preview-theme="default"
                code-theme="atom"
                :show-code-row-number="true"
                
                
                 />
            </article>
    </main>
</template>

<script setup>
import dayjs from 'dayjs'
import MdEditor from 'md-editor-v3';
import { ref, reactive, computed } from 'vue';
import {useGetPostStore} from '@/store/Post'
import {useHead} from "@vueuse/head"
const Posts = useGetPostStore()

MdEditor.config({
    markedOptions:{
        breaks: true
    }
});

const format_date = (value) => {
    if (value) {
        const date = dayjs(value);
        return date.format('dddd MMMM D, YYYY');
    }
}
// const props = defineProps({
//     post: Object
// })

// const post = ref(props.post);
// const markDown = ref(props.markDown)
const state = ref('')
// const content = ref(props.post.content)

const appTheme = localStorage.getItem('theme');
    if(appTheme ==='dark'){
      state.value = true
    }else{
      state.value = false
    }

    if(Posts.post){
            const siteData = reactive({
            title: `Abdulraqeeb's blog | ${Posts.post.title}`,
            description: `${Posts.post.desc}`
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
                    content: `Abdulraqeeb's blog | ${Posts.post.title}`
                    },
                    {
                    property: "og:site_name",
                    content: "Abdulraqeeb's Blog"
                    },
                    {
                    property: "og:url",
                    content: `/blog/${Posts.post._id}`
                    },
                    {
                    property: "og:type",
                    content: "website"
                    },
                    {
                    property: "og:image",
                    itemProp: "image",
                    content: Posts.post.image_url
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
                    content: `Abdulraqeeb's blog | ${Posts.post.title}`
                    },
                    {
                    name: "twitter:title",
                    content: `Abdulraqeeb's blog | ${Posts.post.title}`
                    },
                    {
                    name: "twitter:description",
                    content: Posts.post.desc
                    },
                    {
                    name: "twitter:image",
                    content: Posts.post.image_url
                    }
                ],
            })
        }

// defineExpose({
//     post,
//     markDown,
//     state
// })

</script>

<style>
@import 'md-editor-v3/lib/style.css';
main.shortPost header img.img{
    display: flex;
    justify-content: center;
    width: 750px ;
    height: 300px;
    padding: 15px;
    margin: auto;
    
}

main.shortPost {
    display: inline-block;
    min-width: 780px;
    max-width: 840px;
    margin-left: 15px auto;
    margin-right: 15px auto;
    width: 800px;
    justify-content: center;
}
main.shortPost .innerpage p{
    max-width: 815px;
    margin: 10px;
    margin-left: 5px auto;
    margin-right: 5px auto;
    
}

main.shortPost .tag{
    display: inline-block;
    margin: 0px 10px 10px 0;
    padding: 2px 8px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #1B2737;
  }

main.shortPost .tag.dark{
    background: #1B2737;
    color: #eee;
  }
main.shortPost.dark .date{
    color: white;
    margin: 14px;
}

main.shortPost hr{
    margin-bottom: 15px;
    margin-top: 15px;
    
}

main.shortPost.dark .desc{
    margin-top: 25px;
}

main.shortPost .desc{
    margin-top: 25px;
    font-size: large;
    font-weight: 500;
}
main.shortPost .article{
    margin: 10px;
    margin-left: 5px auto;
    margin-right: 5px auto;
    max-width: 810px; 
}

main.shortPost .md-dark{
    --tw-bg-opacity: 1;
    --md-bk-color: rgb(13 36 56 / var(--tw-bg-opacity)) !important;
}

main.shortPost .default-theme{
    background: var(--light);
    color: #000
   
}

main.shortPost.dark .default-theme{
    --tw-bg-opacity: 1;
    background: rgb(13 36 56 / var(--tw-bg-opacity)) !important;
    color: white
}

main.shortPost .md-preview.default-theme {
    text-align: justify;
    word-break: keep-all;
}
</style>