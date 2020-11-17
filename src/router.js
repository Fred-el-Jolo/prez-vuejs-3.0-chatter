import { createWebHistory, createRouter }  from 'vue-router';
import Register from '@/views/Register';
import Chat from '@/views/Chat';
import Admin from '@/views/Admin';

const routes = [
    {
        path: "/",
        name: "register",
        component: Register,
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat,
        props: true,
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin,
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;
