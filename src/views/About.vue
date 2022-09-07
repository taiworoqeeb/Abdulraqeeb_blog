<template>
        <main class="w-full">
        <body>
        <section>
                <img :class="{black: state == true}" src="../assets/myPics.jpg" alt="myPics">
                    <div class="mylinks" :class="{black: state == true}">
                        <a href="https://twitter.com/TaiwoRaqeeb"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
                        <a href="https://linkedin.com/in/taiworoqeeb"><font-awesome-icon icon="fa-brands fa-linkedin" /></a>
                        <a href="https://github.com/taiworoqeeb"><font-awesome-icon icon="fa-brands fa-github" /></a>
                    </div>
            </section >
            <article :class="{black: state == true}">
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
                For more information about me, you can vist my portfolio website <a class="web" :class="{black: state == true}" href="https://taiworoqeeb.tech"> Here </a>
                 </p>
            </article>
        
        
        </body>
            <div class="footer">
            <Theme />
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import Theme from '../components/theme.vue'
        var state = ref(null)

        if(localStorage.theme === 'dark'){
            state.value = true
        }else{
            state.value = false
        }

        defineExpose({
            state
        })
   

</script>

<style scoped>

section img{
    max-width: 200px;
    justify-content: center;
    margin-top: 8%;
    margin-left: auto;
    margin-right: auto;
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
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    text-align: justify;
    font-size: large;
    font-style: normal;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 200;
    color: #1B2737;
    max-width: 900px;
}

article.black p{
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
    margin-left: auto;
    margin-right: auto;
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

</style>