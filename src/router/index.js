import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import postDetails from '../views/posts/postDetails.vue'
import About from '../views/About.vue'
import Dashboard from '@/views/admin/dashboard.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')

  },
  {
    path: '/blog/:id',
    name: 'Post',
    component: () => import('@/views/posts/postDetails.vue'),
    props: true
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: Dashboard,
    children:[
      {
        path: 'home',
        name: 'AdmnHome',
        component: () => import('@/views/admin/home.vue')
      },
          {
        path: 'createPost',
        name: "CreatePost",
        component: () => import('@/views/admin/createPost.vue')
      },
      {
        path: 'draft',
        name: "Drafts",
        component: () => import('@/views/admin/drafts.vue')
      },
      {
        path: '/admin/dashboard', redirect: '/admin/dashboard/home'
      }
    ]
  },
 
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router