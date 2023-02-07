<template>
	

    <div class="dashboard">
        <siderbar/>

		<router-view />
    </div>
	
</template>

<script setup>
import siderbar from '@/components/siderbar.vue';
import {onMounted, reactive, computed} from 'vue'
import router from '@/router'
import {useHead} from "@vueuse/head"
const siteData = reactive({
  title: "Abdulraqeeb's blog",
  description: "My personal Blog"
})
onMounted(() =>{
    if(!localStorage.Token && !localStorage.User){
        router.push('/admin/login')
    }
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

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}


.dashboard{
	background: var(--light);
  max-width: 100%;
}

.dashboard button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.dashboard {
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 4rem;
		}
	}
}
</style>