import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import postDetails from '../views/posts/postDetails.vue'
import About from '../views/About.vue'
import Dashboard from '@/views/admin/dashboard.vue'
import NotFound from '@/views/notfound.vue'
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
    path: '/admin/login',
    name: 'AdminLogin',
    component: ()=> import('@/views/admin/login.vue')
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
        path: 'posts',
        name: "Posts",
        component: () => import('@/views/admin/listPosts.vue')
      },
      {
        path: '/admin/dashboard', redirect: '/admin/dashboard/home'
      },
      {
        path: 'editpost/:id',
        name: "EditPost",
        component: () =>import('@/views/admin/editPost.vue'),
        props: true
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
 
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router