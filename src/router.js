/* eslint-disable */

import { createWebHistory, createRouter } from "vue-router";
import HomeComp from "./components/HomeView.vue";
import Login from "./components/LoginComp.vue";
import Register from "./components/RegisterComp.vue";
// lazy-loaded
const Profile = () => import("./components/ProfileComp.vue")
const BoardAdmin = () => import("./components/board-admin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")


  const router = createRouter({
    history: createWebHistory(),
     routes: [
  {
    path: "/",
    name: "home",
    component: HomeComp,
  },
  {
    path: "/home",
    component: HomeComp,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
]
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });



export default router;