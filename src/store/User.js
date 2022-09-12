import { defineStore } from 'pinia'
var API = process.env.API ? decodeURI(process.env.API)
: 'https://blogapi-v1.herokuapp.com';

var URL = `${API}/api/user`;

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        password: '',
        message: null,
        status: null,
        error: null,
        data: null,
    }),
    
    actions:{
        async loginUser(){
            this.message = null;
            this.status = null;
            this.error = null;
            try {
                var body = {
                    email: this.email,
                    password: this.password
                }
                const res = await fetch(`${URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if(data.status === true){
                    this.status = true,
                    this.message = data.message,
                    this.data = data.data
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