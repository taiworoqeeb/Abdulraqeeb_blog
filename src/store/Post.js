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
  }
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
    async getById(){
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
    }
  },

  actions: {
    async UpdatePost() {
      this.message = null;
      this.status = null;
      this.error = null;
         try {
          var form = new FormData();
          form.append('title', this.title);
          form.append('desc', this.desc);
          form.append('tags', this.tags);
          form.append('content', this.content);
          form.append('draft', this.draft)
          
          const res = await fetch(`${URL}/updatePost/${this.id}`, {
            method: 'PUT',
            body: form
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