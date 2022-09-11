import {ref} from 'vue';
// import dotenv from 'dotenv';
// dotenv.config()
var API = process.env.API ? decodeURI(process.env.API)
: 'https://blogapi-v1.herokuapp.com';

export var URL = `${API}/api/blog`;

var Posts = async()=>{
    var res = await fetch(`${URL}/getAllPosts`)
    const {data} = await res.json()
    return data
}

export const getPosts = () =>{
    var error = ref(null);
    var posts = ref(null);
    var search = ref('');

    try {
        var load = async()=>{
            const res = await fetch(`${URL}/getAllPosts`)
             const data = await res.json()

             if(data.status === true){
                posts.value = data.data
             }else if(data.status === false){
                throw Error(`${data.message}`)
             }
        }

        var onSearch = () => {
            if(posts.value && search.value){
                    return posts.value.filter((post) => post.title.toLowerCase().includes(search.value.toLowerCase()))
            }else{
                    return posts.value
                }
            }
            
    } catch (err) {
        error.value = err.message
    }

    return{
        posts, error, search, load, onSearch
    }
}

export const getPostId = (id) =>{
    var error = ref(null)
    var post = ref(null)

    try {
        var load = async()=>{
            const res = await fetch(`${URL}/getPost/${id}`, {
                method: 'GET'
            })

            const data = await res.json()

            if(data.status === true){
                post.value = data.data
            } else if(data.status === false){
                throw Error(`${data.message}`)
            }
        }
    } catch (err) {
        error.value = err.message
    }

    return {post, error, load}
}

export const getNextPost = async(id) =>{
    // let post = ref(null)
    var res = await fetch(`${URL}/getAllPosts`)
    const data = await res.json()
    const Posts = data.data
    
        const currentPostId = `${id}`
        const currentPost = Posts.find((post)=> post._id === currentPostId);
        const currentPostIndex = Posts.indexOf(currentPost);
         var post = Posts[currentPostIndex + 1];
        
        if(!post) return null;
        return post
    
}

export const getPreviousPost = async(id) =>{

    // let post = ref(null)

        var res = await fetch(`${URL}/getAllPosts`)
        const data = await res.json()
        const Posts = data.data
    
        const currentPostId = `${id}`
        const currentPost = Posts.find((post)=> post._id === currentPostId);
        const currentPostIndex = Posts.indexOf(currentPost);
        var post = Posts[currentPostIndex - 1];
       
        if(!post) return null;
        return post
    
}

export const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('image', file);
  
          fetch(`${URL}/uploadImage`, {
                method: 'POST',
                body: form
            })
            .then((res) => rev(res.json()))
            .catch((error) => rej(error));
        });
      })
    );
  
    callback(res.map((item) => item.url));
};

export const deletePost = async(id)=>{
    const deleteUrl = `${URL}/deletePost/${id}`

    const res = await fetch
}
