<template>
    <main>
        <header>
            <h1> Posts</h1>
        </header>
        <body>
            <div class="table" >
                <table>
                <thead>
                    <tr>
                        <th> S/N </th>
                        <th> Post Title</th>
                        <th> Post Description</th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="posts" v-for="(post, index) in onSearch()" :key="post._id">       
                        <td class="sn">{{index+1}}</td>
                        <td>{{post.title}}</td>
                        <td>{{post.desc}}</td>
                        <td class="action">
                            <router-link :to="{name: 'EditPost', params: {id: post._id}}">
                                <span class="material-icons">edit_note</span>
                            </router-link>
                            <button @click="deletePost(post._id)">
                                <span class="material-icons">delete</span>
                            </button>
                            
                        </td> 
                    </tr>
                </tbody>
                
                </table>
            </div>
        </body>
    </main>
</template>

<script setup>
import {getPosts} from '@/composite/Posts'
import { ref } from 'vue';
import router from '@/router';
import {usedeletePost} from '@/store/Post'
import Swal from 'sweetalert2'
const {posts, search, onSearch, load} = getPosts()

load()

const deleteStore = usedeletePost()



const deletePost = (id)=>{
    deleteStore.id = id
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteStore.deletePost().then(() =>{
                if(deleteStore.status && deleteStore.message){
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${deleteStore.message}`,
                    }).then((result)=>{
                        if(result.isConfirmed){
                            router.go();
                        }
                        
                    })
                    
                }else if(!deleteStore.status && deleteStore.message){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${deleteStore.message}`
                    })
                }

                if(deleteStore.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${deleteStore.error}`
                    })
                }    
         })
   
        }
    })
   
}

</script>

<style scoped>

body{
    margin-left: 50px;
    margin-top: 120px;
}
.table{
    display: flex;
    background: #fff;
    width: auto;
    max-width: 100vh;
    border-radius: 20px;
    margin: 10px auto;
    justify-content: center;
}

.table table thead th{
    padding: 16px 25px;
    border: 0 solid transparent;
    font-size: 14px;
    font-weight:300;
    color: #00273d;
  
}

.table table tbody tr{
    background: #fff;
}

.table table tbody td{
    padding: 16px 25px;
    font-size: 12px;
    color: #888;
    font-weight: 300;
    border-left: 1px solid #ddd;
    text-align: left;
}
.table table tbody td.sn{
    border: none;
}
.action{
    margin: 0px auto;
    display: inline-flex;
    text-align: center;
    justify-content: center;
}

.action .material-icons{
    font-size: x-large;
}


</style>