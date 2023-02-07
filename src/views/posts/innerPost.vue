<template>
    <main v-if="Posts.post" class="shortPost" :class="{dark: state == true}">
        <header>
            <img class="img" :src="Posts.post.image_url">
            <br/>
        </header>
        <section class="innerpage">
            <h1 class="title ext-2xl font-bold md:text-3xl dark:text-white text-center mb-5"> {{Posts.post.title}}</h1>
            <div class="tags">
                <div v-if="Posts.post.tags" v-for="tag in Posts.post.tags" :key="tag" class="tag" :class="{dark: state == true}">
                <span>#{{tag.toLowerCase()}}</span>
                 </div>
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
    display: inline-flex;
    justify-content: center;
    width: 70%;
    height: 300px;
    padding: 15px;
    align-items: center;
    max-width: 100%;
    
}

main.shortPost {
    display: inline-block;
    max-width: 100%;
    margin-left: 15px;
    margin-right: 15px;
    width: 65%;
    justify-content: center;
}
main.shortPost .innerpage p{
    width: 100%;
    max-width: 100%;
    margin: 10px;
    margin-left: 5px;
    margin-right: 5px;
    
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
    max-width: 100%;
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
    margin-left: 5px;
    margin-right: 5px;
    width: 100%; 
    max-width: 100%;
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

main.shortPost .md-editor-preview {
    text-align: justify;
    word-break: keep-all;
}

@media screen and (max-width: 991px) {
   
    main.shortPost{
        display: inline-block;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-left: 2px;
        margin-right: 2px;
        
        
    }
    main.shortPost header img.img{
        width: 90%;
        max-width: 100%;
        align-items: center;
        justify-content: center;
      
    }
    section.innerpage{
        max-width: 100%;
        margin: 0;
        padding: 0;
    }
    
    section.innerpage .tags{
        justify-content: center;
        max-width: 100%;
    }

    main.shortPost .desc{
        max-width: 100%;
    }
    main.shortPost .article{
        max-width: 100%;
    }

    main.shortPost .md-editor-preview {
        text-align: justify;
        word-break: keep-all;
        max-width: 100%;
    }
}
</style>