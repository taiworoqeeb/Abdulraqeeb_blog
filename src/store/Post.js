import { defineStore } from 'pinia'
import ImageIcon from '@/assets/imageIcon.png'

var API = process.env.API ? decodeURI(process.env.API)
: 'https://blogapi-v1.herokuapp.com';

var URL = `${API}/api/blog`;

export const useCreatePostStore = defineStore('createpost', {
  state: () => ({ 
        
        image: '',
        title: '',
        desc: '',
        tag: '',
        tags: [ ],
        content: '',
        error: null,
        message: null,
        draft: false,
        status: null,
    }),

  getters: {

  },

  actions: {
    async CreatePost() {
      this.message = null;
      this.status = null;
      this.error = null;
         try {
          var form = new FormData();
          form.append('image', this.image);
          form.append('title', this.title);
          form.append('desc', this.desc);
          form.append('tags', this.tags);
          form.append('content', this.content);
          form.append('draft', this.draft)
          
          const res = await fetch(`${URL}/createPost`, {
            method: 'POST',
            body: form
          });
            const data = await res.json();
            if(data.status === true){
              this.status = true
              this.message = data.message;
              this.image = '';
              this.title = '';
              this.desc = '';
              this.tags= [ ];
              this.content = '';
              this.draft = false;
              this.error = null;
            }else{
              this.status = false
              this.message = data.message
          }
        
      } catch (error) {
        this.error = error; 
      }
      
    }
  },

  persist: true
})

export const useEditPostStore = defineStore('editpost', {
  state: () => ({ 
        id: '',
        image: '',
        oldImage: ImageIcon,
        title: '',
        desc: '',
        tag: '',
        tags: [ ],
        content: '',
        error: null,
        message: null,
        draft: null,
        status: null,
    }),

  getters: {
    
  },

  actions: {
    async getById(id){
      this.id = id
      try {
        const res = await fetch(`${URL}/getPost/${this.id}`, {
          method: 'GET',
        })
        const data = await res.json()
        if(data.status === true){
            this.title = data.data.title;
            this.desc = data.data.desc;
            this.tags = data.data.tags;
            this.content = data.data.content;
            this.draft = data.data.draft;
            if(data.data.image_url){
              this.oldImage = data.data.image_url
            }else{
              this.oldImage = ImageIcon
            }
            
        }else{
          throw Error(`${data.message}`)
        }
        
      } catch (error) {
        this.error = error
      }
    },
    async UpdatePost() {
      this.message = null;
      this.status = null;
      this.error = null;
         try {
          var body = {
            title: this.title,
            desc: this.desc,
            tags: this.tags,
            content: this.content,
            draft: this.draft
          }
          
          const res = await fetch(`${URL}/updatePost/${this.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
            const data = await res.json();
            if(data.status === true){
              this.status = true
              this.message = data.message;
              this.title = '';
              this.desc = '';
              this.tags= [ ];
              this.content = '';
              this.draft = false;
              this.error = null;
            }else{
              this.status = false
              this.message = data.message
          }
        
      } catch (error) {
        this.error = error; 
      }
      
    },

    async DeleteImage(){
      this.message = null;
      this.status = null;
      this.error = null;
      try {
        const res = await fetch(`${URL}/removeImage/${this.id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        if(data.status === true){
          this.status = true,
          this.message = data.message
        }else{
          this.status = false,
          this.message = data.message
        }
      } catch (error) {
        this.error = error
      }
    },

    async UpdateImage(){
      this.message = null;
      this.status = null;
      this.error = null;
      try {
        const form = new FormData()
        form.append('image', this.image)
        const res = await fetch(`${URL}/updateImage/${this.id}`, {
          method: 'PUT',
          body: form
        })
        const data = await res.json()
        if(data.status === true){
          this.status = true,
          this.message = data.message,
          this.oldImage = data.data
        }else{
          this.status = false,
          this.message = data.message
        }
      } catch (error) {
        this.error = error
      }
    }
  }
})

export const usedeletePost = defineStore('deletePost', {
  state: () =>({
    id: '',
    message: null,
    status: null,
    error: null
  }),

  actions:{
    async deletePost(){
      const deleteUrl = `${URL}/deletePost/${this.id}`
      try {
            const res = await fetch(deleteUrl, {
            method: 'DELETE'
          })
          const data = await res.json()
          if(data.status === true){
            this.status = true
            this.message = data.message;
            this.id = '';
            this.error = null;
          }else{
            this.status = false
            this.message = data.message
        }
      } catch (error) {
        this.error = error
      }
    }
  }
})

export const useGetPostStore = defineStore('getPost', {
  state: ()=>({
    id: '',
    error: null,
    post: null,
    message: null,
    nextPost: null,
    previousPost: null,
    search: null,
    posts: null,
    searchedPost: null
  }),

  getters:{
    async getPosts(state){
      state.message = null
      state.error = null
      try {
        const res = await fetch(`${URL}/getAllPosts`)
        const data = await res.json()

        if(data.status === true){
          state.posts = data.data
       }else if(data.status === false){
          state.message = data.message
       }

      } catch (error) {
        state.error = error.message
      }
    },
    searchState(state){
      if(state.posts && state.search && state.search !== "" && state.search !== null){
        state.searchedPost = state.posts.filter((post) => post.title.toLowerCase().includes(state.search.toLowerCase()))
     }else{
        state.searchedPost = state.posts
     }
    }
  },

  actions: {
    
    async getPostById(){
      this.error = null;
      this.post = null;
      try {
        const res = await fetch(`${URL}/getPost/${this.id}`, {
          method: 'GET'
        })
        const data = await res.json()
        if(data.status === true){
          this.post = data.data
      } else if(data.status === false){
          this.message = data.message
      }

      } catch (error) {
        this.error = error.message
      }
    },

    async getContPost(){
      try {
        // var res = await fetch(`${URL}/getAllPosts`, {
        //   method: 'GET'
        // })
        // const data = await res.json()
        const Posts = this.posts

        const currentPost = Posts.find((post) => post._id ===  this.id);
        const currentPostIndex = Posts.indexOf(currentPost);
        const post = Posts[currentPostIndex + 1];
        const opppost = Posts[currentPostIndex - 1];
        if(!post){
          this.nextPost = null
        }else{
          this.nextPost = post
        }

        if(!opppost){
          this.previousPost = null
        }else{
          this.previousPost = opppost
        }
      } catch (error) {
        this.error = error.message
      }
    }
  }
})