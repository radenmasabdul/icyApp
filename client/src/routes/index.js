import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ForgotPassword from '../views/auth/ForgotPassword.vue';
import Home from "../views/home/Home.vue"
import Admin from '../views/admin/Admin.vue';
import Student from '../views/student/Student.vue';
import Courses from '../views/courses/Courses.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //auth
        {
            path: "/",
            name: "login",
            component: Login,
            meta: {
                title: "Welcome",
            },
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                title: "Register",
            },
        },
        {
            path: "/forgot",
            name: "forgot",
            component: ForgotPassword,
            meta: {
                title: "Forgot Password",
            },
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Home,
            meta: {
                title: "Dashboard",
            },
        },
        {
            path: "/users",
            name: "users",
            component: Admin,
            meta: {
                title: "Users",
            },
        },
        {
            path: "/students",
            name: "students",
            component: Student,
            meta: {
                title: "Students",
            },
        },
        {
            path: "/courses",
            name: "courses",
            component: Courses,
            meta: {
                title: "Courses",
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `ICY APP! || ${to.meta.title}`;
    next();
});

export default router;
