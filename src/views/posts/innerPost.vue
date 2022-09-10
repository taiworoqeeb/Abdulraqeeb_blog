<template>
    <main v-if="post" class="shortPost w-full ">
        <header>
            <img class="img" :src="post.image_url">
            <br/>
        </header>
        <section class="innerpage">
            <h1 class="text-2xl font-bold md:text-3xl dark:text-white text-center mb-5"> {{post.title}}</h1>
            <div v-if="post.tags" v-for="tag in post.tags" :key="tag" class="tag" :class="{dark: state == true}">
                <span>#{{tag.toLowerCase()}}</span>
            </div>
            <p class="text-xl dark:text-white font-bold mb-4 md:text-xl max-w-xl sm:text-l text-justify">{{post.desc}}</p>
        </section>
            <article  class="article text-justify" :class="{dark: state == true}" >
                <MdEditor 
                v-model="content" 
                preview-only 
                language="en-US"
                :theme="`${state ? 'dark' : 'light'}`"
                preview-theme="default"
                code-theme="atom"
                
                 />
            </article>
    </main>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import { ref } from 'vue';

MdEditor.config({
    markedOptions:{
        breaks: true
    }
});

const props = defineProps({
    post: Object
})

const post = ref(props.post);
const markDown = ref(props.markDown)
const state = ref('')
const content = ref(props.post.content)

const appTheme = localStorage.getItem('theme');
    if(appTheme ==='dark'){
      state.value = true
    }else{
      state.value = false
    }
    

defineExpose({
    post,
    markDown,
    state
})

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

main.shortPost .md-preview.default-theme {
    text-align: justify;
    word-break: keep-all;
}
</style>