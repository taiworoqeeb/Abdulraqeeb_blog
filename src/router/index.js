import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import postDetails from '../views/posts/postDetails.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About

  },
  {
    path: '/blog/:id',
    name: 'Post',
    component: postDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router