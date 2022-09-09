<template>
    <main class="w-full ">
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
            <article class="article prose dark:prose-dark text-justify max-w-xl" :class="{dark: state == true}" v-html="markDown(post.content)"/>
    </main>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    post: Object,
    markDown: Function
})

const post = ref(props.post);
const markDown = ref(props.markDown)
const state = ref('')

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

<style scoped>

@import "~highlight.js/styles/monokai-sublime.css";
header img.img{
    display: flex;
    justify-content: center;
    width: 750px ;
    height: 300px;
    padding: 15px;
    margin: auto;
    
}

main {
    display: inline-block;
    min-width: 780px;
    max-width: 810px;
    margin-left: 15px auto;
    margin-right: 15px auto;
    width: 750px
}
.innerpage p{
    max-width: 810px;
    margin: 10px;
    margin-left: 5px auto;
    margin-right: 5px auto;
    
}

.tag{
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

.tag.dark{
    background: #1B2737;
    color: #eee;
  }

.article{
    margin: 10px;
    margin-left: 5px auto;
    margin-right: 5px auto;
    max-width: 810px;
}

.article > p > img {
  max-width: 90%;
  max-height: 600px;
  display: flex;
  margin: auto;
}

</style>