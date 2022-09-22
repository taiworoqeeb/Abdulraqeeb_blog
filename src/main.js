import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightLong,
  faArrowLeftLong,
  faUserSecret,
  faMoon,
  faSun,
  faLongArrowLeft
} from "@fortawesome/free-solid-svg-icons";

 import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faTwitter,
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
import { createHead } from "@vueuse/head"


library.add(
  faTwitter,
  faGithub,
  faLinkedin,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faLongArrowLeft,
  faArrowRightLong,
  faArrowLeftLong,
  faUserSecret,
  faPenToSquare
);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .use(router)
  .use( createHead())
  .mount("#app");

const appTheme = localStorage.getItem("theme");

if(!appTheme || appTheme === null || appTheme === undefined){
  localStorage.setItem("theme", "light")
}

// Check what is the active theme and change theme when user clicks on the theme button in header.
if(localStorage.Token && localStorage.User){
  window.setTimeout(()=>{
    localStorage.removeItem('Token');
    localStorage.removeItem('User')
  }, 60000*24*60)
}

if (
  appTheme === "dark" &&
  (document.documentElement.classList.contains("dark") ||
    document.getElementById("app"))
) {
  document.documentElement.classList.add("bg-primary-dark");
} else {
  document.documentElement.classList.add("bg-secondary-light");
}
