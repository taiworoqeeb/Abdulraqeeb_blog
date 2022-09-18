<template>
    <div class="inter" :class="{dark: state == true}">
        <section class="inputComment">
            <form @submit.prevent>
                <span>COMMENT</span>
                <div v-if="!username">
                    <label for="name">Name: </label>
                    <input v-model="Response.name" type="text" placeholder="Enter your name">
                </div>
                <div v-else>
                    <label for="name">Name: {{username}}</label>
                </div>
                    <label for="comment">Comment: </label>
                    <textarea v-model="Response.comment" placeholder="Comment"></textarea>
                <div class="submit">
                    <button type="submit" @click="submitComment">Submit</button>
                </div>
            </form>
        </section>
        <hr>
        <section class="comments">
            <div v-if="!Response.hideComment" >
                <div v-if="Posts.post.comments?.length">
                    <ul v-for="(comment, index) in Posts.post.comments" :key="comment._id">
                        <li>
                            <div class="CommentStatements">
                                <h1>
                                    <span class="CommentName">{{comment.name}}</span>
                                    <span class="CommentDate">{{format_date(comment.createdAt)}}</span>
                                </h1>
                                <p class="CommentWord">{{comment.comment}}</p>
                                <div class="actions">
                                    <div class="activityButton">
                                        <label>
                                            <button @click="upvoteComment(comment._id)" class="upvote">
                                                <span class="material-icons">
                                                thumb_up_alt
                                                </span>
                                                <span>{{comment.upvote}}</span>
                                            </button>
                                            
                                        </label>
                                        <label>
                                            <button @click="downvoteComment(comment._id)" class="downvote">
                                                <span class="material-icons">
                                                thumb_down_alt
                                                </span>
                                                <span>{{comment.downvote}}</span>
                                            </button>
                                            
                                        </label>
                                        
                                        <button @click="deleteComment(comment._id)" class="delete">
                                            <span class="material-icons">
                                                delete
                                            </span>
                                        </button>
                                        <button @click="toggleReply(index)" :key="comment._id">
                                            <span class="material-icons">
                                                reply
                                            </span> 
                                        </button>
                                        
                                    </div>
                                    <div class="ReplyInput" v-if="showReply[index]">
                                        <form @submit.prevent>
                                        <span>REPLY</span>
                                        <div v-if="!username">
                                            <label for="name">Name: </label>
                                            <input v-model="Response.name" type="text" placeholder="Enter your name">
                                        </div>
                                        <div v-else>
                                            <label for="name">Name: {{username}} </label>
                                        </div>
                                            <label for="reply">Reply: </label>
                                            <textarea v-model="Response.reply" placeholder="Reply"></textarea>
                                            <div class="submit">
                                                <button type="submit" @click="submitReply(comment._id)">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="comment.reply?.length">
                                <ul v-for="reply in comment.reply" :key="reply._id">
                                    <li>
                                        <div class="ReplyStatements">
                                            <h1>
                                                <span class="ReplyName">{{reply.name}}</span>
                                                <span class="ReplyDate">
                                                {{format_date(reply.createdAt)}}
                                                </span>
                                            </h1>
                                            <p class="ReplyWord">{{reply.reply}}</p>
                                            <div class="activityButton">
                                                <label for="">
                                                    <button @click="upvoteReply(reply._id)" class="upvote">
                                                        <span class="material-icons">
                                                        thumb_up_alt
                                                        </span>
                                                    </button>
                                                    <span>{{reply.upvote}}</span>
                                                </label>
                                                <label for="">
                                                    <button @click="downvoteReply(reply._id)" class="downvote">
                                                        <span class="material-icons">
                                                        thumb_down_alt
                                                        </span>
                                                    </button>
                                                    <span>{{reply.downvote}}</span>
                                                </label>
                                                <button @click="deleteReply(reply._id)" class="delete">
                                                    <span class="material-icons">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </div> 
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <span>No comments available</span>
                </div>
            </div>
            <div class="showButton">
                <button @click="toggleComment">
                    <div v-if="Response.hideComment">
                    <span>Show all comments</span>  
                    <span class="out material-icons">
                        keyboard_double_arrow_down
                    </span>
                        </div>
                    <div v-else> 
                        <span>Show less comments</span>
                        <span class="in material-icons">
                        keyboard_double_arrow_up
                        </span>
                    </div>
                </button>
            </div>
        </section>
    </div>
</template>

<script setup>
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import {useGetPostStore, useResponseStore} from '@/store/Post';
import { ref } from 'vue';
import router from '@/router'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const Posts = useGetPostStore()
const Response = useResponseStore()

const state = ref('')
// const content = ref(props.post.content)

const appTheme = localStorage.getItem('theme');
    if(appTheme ==='dark'){
      state.value = true
    }else{
      state.value = false
    }
    

const username = localStorage.getItem('username')

if(username){
    Response.name = username
}

const format_date = (value) => {
        if (value) {
            const date = dayjs(value);
            return date.format('llll');
        }
    }
const submitComment = ()=>{
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Swal.fire({
        title: 'Do you want to submit comment?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        denyButtonText: `Don't submit`,
      }).then((result) =>{
        if(result.isConfirmed){
            localStorage.setItem('username', Response.name)
            Response.addComment().then(() => {
              if(Response.status && Response.message){
                Toast.fire({
                icon: 'success',
                title: `${Response.message}`,
              })
              Posts.getPostById()
            }else if(!Response.status && Response.message){
                Toast.fire({
                    icon: 'error',
                    title: `${Response.message}`
                })
        }

        if(Response.error){
         Toast.fire({
            icon: 'error',
            title: `${Response.error}`
          })
        }    
          })
          
         
        }else if(result.isDenied){
          Toast.fire({
            title:'Changes are not saved',
            icon: 'info'
            })
        }
      })
}

const submitReply = (id)=>{
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Swal.fire({
        title: 'Do you want to reply?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) =>{
        if(result.isConfirmed){
            localStorage.setItem('username', Response.name)
            Response.addReply(id).then(() => {
              if(Response.status && Response.message){
             Toast.fire({
                icon: 'success',
                title: `${Response.message}`,
              })
               Posts.getPostById()
            }else if(!Response.status && Response.message){
          Toast.fire({
            icon: 'error',
            title: `${Response.message}`
          })
        }

        if(Response.error){
         Toast.fire({
            icon: 'error',
            title: `${Response.error}`
          })
        }    
          })
          
         
        }else if(result.isDenied){
          Toast.fire({
            title:'Changes are not saved',
            icon: 'info'
            })
        }
      })
}

const deleteComment = (id)=>{
     var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
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
            Response.deleteComment(id).then(() =>{
                if(Response.status && Response.message){
                    Toast.fire({
                        icon: 'success',
                        title: `${Response.message}`,
                    })
                     Posts.getPostById()
                    
                }else if(!Response.status && Response.message){
                    Toast.fire({
                        icon: 'error',
                        title: `${Response.message}`
                    })
                }

                if(Response.error){
                    Toast.fire({
                        icon: 'error',
                        title:`${Response.error}`
                    })
                }    
         })
   
        }
    })
}

const deleteReply = (id)=>{
     var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
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
            Response.deleteReply(id).then(() =>{
                if(Response.status && Response.message){
                    Toast.fire({
                        icon: 'success',
                        title: `${Response.message}`,
                    })
                     Posts.getPostById()
                    
                }else if(!Response.status && Response.message){
                    Toast.fire({
                        icon: 'error',
                        title: `${Response.message}`
                    })
                }

                if(Response.error){
                    Toast.fire({
                        icon: 'error',
                        title:`${Response.error}`
                    })
                }    
         })
   
        }
    })
}

const upvoteComment = (id)=>{
    Response.upvoteComment(id).then(()=>{
        Posts.getPostById()
    })
}
const downvoteComment = (id)=>{
    Response.downvoteComment(id).then(()=>{
        Posts.getPostById()
    })
}
const upvoteReply = (id)=>{
    Response.upvoteReply(id).then(()=>{
       Posts.getPostById()
    })
}
const downvoteReply = (id)=>{
    Response.downvoteReply(id).then(()=>{
       Posts.getPostById()
    })
}

const showReply = ref([false])
const toggleComment = () =>{
    Response.hideComment = !Response.hideComment
   
}

const toggleReply = (index) =>{
    showReply.value[index] = !showReply.value[index]
}
</script>

<style lang="scss" scoped>

.inter{
    margin-top: 10px;
    .inputComment{
        form{
            max-width: 100%;
            margin: 20px auto;
            margin-top: 2px;
            margin-left: 20%;
            margin-right: 20%;
            text-align: left;
            padding: 30px;
            border: 2px solid #ddd;
            border-radius: 10px;
            span{
                font-weight: bold;
                font-size: larger;
                margin-left: 35%;
            }
        }
        label{
            color: #aaa;
            display: inline-block;
            margin: 25px 0 15px;
            font-size: 0.6em;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
        }

        input, textarea{
            display: block;
            padding: 10px 6px;
            width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom: 1px solid #ddd;
            color: #555;
            border-radius: 10px;
            text-indent: 10px;
        }
        textarea{
            height: 100px;
        }
        button{
            background: #0b6dff;
            border: 0;
            padding: 10px 20px;
            margin-top: 20px;
            color: white;
            border-radius: 20px;
        }
        .submit{
            text-align: center;
        }
    }
    .comments{
        margin-top: 30px;
        .showButton{
            border: 2px solid #000;
            border-radius: 20px;
            width: 40%;
            justify-content: center;
            margin-left: 30%;
            padding: 5px;
            button{
                display: inline;
                span{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: var(--grey);
                    font-size: medium;
                    text-align: justify;
                    margin: 0px;
                    padding: 0px;
                }
                span.material-icons.out:hover{
                    
                    transition: 0.2s ease-out;
                    transform: translateY(0.2rem);
                }
                span.material-icons.in:hover{
                    
                    transition: 0.2s ease-out;
                    transform: translateY(-0.2rem);
                }
            }
        }

        li div.CommentStatements{
            width: 50%;
            margin-left: 15%;
            display: block;
            h1 {
                text-align: left;
                span.CommentName{
                text-align: left;
                margin: 5px;
                padding: 5px;
                font-weight: bold;
                font-size: large;
                }
                span.CommentDate{
                    margin-left: 5px;
                    font-size: small;
                    font-weight: 400;

                }
            }
            p.CommentWord{
                margin: 5px;
                padding-left: 5px;
                text-align: left;
                font-size: smaller;
            }

            div.actions{
                margin: 5px;
                padding-left: 8px;
                .activityButton{
                    align-items: flex-start;
                    justify-content: left;
                    text-align: left;
                    font-size: xx-small;
                }
                .ReplyInput{
                    form{
                        max-width: 100%;
                        margin: 10px auto;
                        margin-top: 2px;
                        margin-left: 10%;
                        margin-right: 10%;
                        text-align: left;
                        padding: 20px;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        span{
                            font-weight: bold;
                            font-size: larger;
                            margin-left: 35%;
                        }
                    }
                    label{
                        color: #aaa;
                        display: inline-block;
                        margin: 25px 0 15px;
                        font-size: 0.6em;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-weight: bold;
                    }

                    input, textarea{
                        display: block;
                        padding: 8px 5px;
                        width: 100%;
                        box-sizing: border-box;
                        border: none;
                        border-bottom: 1px solid #ddd;
                        color: #555;
                        border-radius: 10px;
                        text-indent: 10px;
                    }
                    textarea{
                        height: 100px;
                    }
                    button{
                        background: #0b6dff;
                        border: 0;
                        padding: 10px 20px;
                        margin-top: 15px;
                        color: white;
                        border-radius: 20px;
                    }
                    .submit{
                        text-align: center;
                    }
                }
            }
        }
        li div.ReplyStatements{
            width: 50%;
            margin-left: 15%;
            display: block;
            h1 {
                text-align: left;
                margin-left: 20%;
                span.ReplyName{
                text-align: left;
                margin: 5px;
                padding: 5px;
                font-weight: bold;
                font-size: large;
                }
                span.ReplyDate{
                    margin-left: 5px;
                    font-size: small;
                    font-weight: 400;

                }
            }
            p.ReplyWord{
                margin: 5px;
                margin-left: 21%;
                padding-left: 5px;
                text-align: left;
                font-size: smaller;
            }
            .activityButton{
                margin: 5px;
                margin-left: 21%;
                padding-left: 8px;
                align-items: flex-start;
                justify-content: left;
                text-align: left;
                font-size: xx-small;
            }

        }
    }
}

.inter.dark{
    .inputComment{
        form{
            span{
                color: white;
            }
        }
    }
    .comments{
        margin-top: 30px;
        .showButton{
            border-color: white;
            button{
                span{
                   color: white;
                }
            }
        }

        li div.CommentStatements{
            h1 {
                span.CommentName{
                color: white;
                }
                span.CommentDate{
                    color: white;

                }
            }
            p.CommentWord{
                color: whitesmoke;
            }

            div.actions{
                .activityButton{
                    color: whitesmoke;
                }
                .ReplyInput{
                    form{
                        span{
                            color: white;
                        }
                    }
                    
                }
            }
        }
        li div.ReplyStatements{
            h1 {
                span.ReplyName{
                color: white;
                }
                span.ReplyDate{
                   color: white;

                }
            }
            p.ReplyWord{
                color: whitesmoke;
            }
            .activityButton{
               color: whitesmoke;
            }

        }
    }
}

</style>