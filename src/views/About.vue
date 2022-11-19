<template>
    <navigation />
        <main class="about">
        <body :class="{dark: state == true}">
        <section :class="{dark: state == true}">
                <img :class="{black: state == true}" src="../assets/myPics.jpg" alt="myPics">
                    <div class="mylinks" :class="{black: state == true}">
                        <a href="https://twitter.com/TaiwoRaqeeb" target="_blank" rel="noreferrer noopener"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
                        <a href="https://linkedin.com/in/taiworoqeeb" target="_blank" rel="noreferrer noopener"><font-awesome-icon icon="fa-brands fa-linkedin" /></a>
                        <a href="https://github.com/taiworoqeeb" target="_blank" rel="noreferrer noopener"><font-awesome-icon icon="fa-brands fa-github" /></a>
                    </div>
            </section >
            <article :class="{dark: state == true}" >
                <p> I am <b>Abdulraqeeb Taiwo</b>, a fullstack developer. I work with JavaScript/TypeScript, i have more than 5 years of programming experience and 1+ Nodejs professional experience.
                <ul>
                    <h1>My stack are: </h1>
                    <h3>Backend: </h3>
                    <li>Nodejs</li>
                    <li>ExpressJs</li>
                    <li>Nestjs</li>
                    <li>Sql/NoSql databases...</li>
                    <br/>
                    <h3>Frontend: </h3>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>VueJs (Vue3)</li>
                </ul>
                <br/>
                For more information about me, you can vist my portfolio website <a class="web" :class="{black: state == true}" href="https://taiworoqeeb.tech" target="_blank" rel="noreferrer noopener"> Here </a>
                 </p>
            </article>
        
        
        </body>
    </main>
</template>

<script setup>
import navigation from '@/components/navigation.vue';
import { ref,  reactive, computed } from 'vue'
import Theme from '../components/theme.vue'
import {useHead} from "@vueuse/head"
const siteData = reactive({
  title: "Abdulraqeeb's blog",
  description: "My personal Blog"
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
        var state = ref(null)

       const appTheme = localStorage.getItem('theme');
        if(appTheme ==='dark'){
            state.value = true
        }else{
            state.value = false
        }
    

        defineExpose({
            state
        })
   

</script>

<style scoped>
  .about{
    max-width: 100%;
    margin: 5px 10px 5px 10px;
  }
  section{
    max-width: 100%;
  }
section img{
  display: inline-flex;
    max-width: 200px;
    justify-content: center;
    margin-top: 8%;
    border-radius: 120px;
    border-width: 5px;
    border-color: #1B2737;
}

section img.black {
    border-color: white;
}

.footer{
    justify-content: end;
    align-content: center;
    margin-top: 100px;
}

article p{
    margin: 20px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    text-align: justify;
    font-size: large;
    font-style: normal;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 200;
    color: #1B2737;
    max-width: 100%;
    width: 90%;
}

article.dark p{
    color: white
}

ul h1 {
    font-weight: bold;
}

ul h3{
    text-indent: 100px;
    font-weight: bold;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 10px;
    
}

ul li{
    text-indent: 150px;
    margin-top: 0px;
    
}

.web.black {
    color: white;
    text-decoration: 2px underline solid;
}

.web{
    text-decoration: 2px underline solid;
}

.mylinks a{
    margin: 2px;
    padding: 5px;
    display: inline-flex;
    justify-content: center;
    font-size: xx-large;
    color: #1B2737;
}

.mylinks.black a{
    color: white;
}

.web:hover{
    color: blue;
}

main{
    margin-bottom: 90px;
    
}



</style>