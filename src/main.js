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
//  import { faMagnifyingGl } from '@fortawesome/free-regular-svg-icons'
import {faTwitter, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter, faGithub, faLinkedin, faMagnifyingGlass, faMoon, faSun,faLongArrowLeft,  faArrowRightLong, faArrowLeftLong, faUserSecret);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
