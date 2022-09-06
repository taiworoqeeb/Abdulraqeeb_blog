<template>
    <main>
        <header class="innerpage">
            <img class="img grid-element" :src="post.image_url">
            <br/>
            <h1 class="text-2xl font-bold md:text-4xl dark:text-white text-center mb-12"> {{post.title}}</h1>
            <p class="text-xl dark:text-white font-bold mb-4 text-justify">{{post.desc}}</p>
        </header>
            <article class="content prose dark:prose-dark text-justify max-w-3xl" v-html="markDown(post.content)"/>
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

defineExpose({
    post,
    markDown
})

</script>

<style scoped>
.innerpage img.img{
    justify-content: center;
    width: 1200px;
    height: 300px;
    margin-left: 5vh auto;
    margin-right: 5vh auto;
}

.content{
    margin: 2px;
    margin-left: 5vh auto;
    margin-right: 5vh auto;
    max-width: 750px;
}


</style>