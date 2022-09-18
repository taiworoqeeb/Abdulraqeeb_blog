import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import postDetails from '../views/posts/postDetails.vue'
import About from '../views/About.vue'
import Dashboard from '@/views/admin/dashboard.vue'
import NotFound from '@/views/notfound.vue'
import CreatePost from '@/views/admin/createPost.vue'
import EditPost from '@/views/admin/editPost.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      scrollPos: {
          top: 0,
          left: 0,
      },
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      scrollPos: {
          top: 0,
          left: 0,
      },
    },

  },
  {
    path: '/blog/:id',
    name: 'Post',
    component: () => import('@/views/posts/postDetails.vue'),
    props: true,
    meta: {
      scrollPos: {
          top: 0,
          left: 0,
      },
    },
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
        component: CreatePost
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
        component: EditPost,
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition ) {
      const scrollpos = savedPosition ||
        to.meta?.scrollPos ||
        { left: 0, top: 0 }
      return new Promise((resolve) => {
        setTimeout(() => {
            resolve(scrollpos)
        }, 600) // transition just before 600ms
    })
    } else {
      return { top: 0, behavior: 'smooth', }
    }
  }
})

router.beforeEach((to, from, next) => {
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)
  return next()
})

export default router