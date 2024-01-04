import { createRouter, createWebHistory } from 'vue-router'
import Contact from '../views/examples/Contact.vue'
import Products from '../views/examples/Products.vue'
import Basket from '../views/examples/Basket.vue'
/*------------------------------------------------------------------------*/
import Title from '../views/Title.vue'
import MainMenu from '../views/MainMenu.vue'
import CreateAccount from '../views/CreateAccount.vue'

const routes = [
    {
        path: '/products',
        name: 'products',
        component: Products,
    },
    {
        path: '/basket',
        name: 'Basket',
        component: Basket,
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
    },
    /*------------------------------------------------------------------------*/
    {
        path: '/',
        name: 'title',
        component: Title,
    },
    {
        path: '/mainmenu',
        name: 'main menu',
        component: MainMenu,
    },
    {
        path: '/createaccount',
        name: 'create account',
        component: CreateAccount,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router