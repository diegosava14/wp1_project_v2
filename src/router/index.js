import { createRouter, createWebHistory } from 'vue-router'
import Contact from '../views/examples/Contact.vue'
import Products from '../views/examples/Products.vue'
import Basket from '../views/examples/Basket.vue'
/*------------------------------------------------------------------------*/
import Title from '../views/Title.vue'
import MainMenu from '../views/MainMenu.vue'
import CreateAccount from '../views/CreateAccount.vue'
import CreateAttack from "../views/CreateAttack.vue";
import Store from "../views/Store.vue";
import SellAttack from "../views/SellAttack.vue";
import BuyAttack from "../views/BuyAttack.vue";
import Account from "../views/Account.vue";
import Backpack from "../views/Backpack.vue";
import Ranking from "../views/Ranking.vue";
import OtherAccount from "../views/OtherAccount.vue";
import Statistics from "../views/Statistics.vue";
import GameFinder from "../views/GameFinder.vue";
import GameCreation from "../views/GameCreation.vue";
import ChooseAttack from "../views/ChooseAttack.vue";

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
    },
    {
        path: '/store',
        name: 'store',
        component: Store,
    },
    {
        path: '/store/createattack',
        name: 'create attack',
        component: CreateAttack,
    },
    {
        path: '/store/sellattack',
        name: 'sell attack',
        component: SellAttack,
    },
    {
        path: '/store/buyattack',
        name: 'buy attack',
        component: BuyAttack,
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
    },
    {
        path: '/account/backpack',
        name: 'backpack',
        component: Backpack,
    },
    {
        path: '/account/chooseAttack',
        name: 'choose attack',
        component: ChooseAttack,
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
    },
    {
        path: '/otheraccount',
        name: 'other account',
        component: OtherAccount,
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: Statistics,
    },
    {
        path: '/gamefinder',
        name: 'game finder',
        component: GameFinder,
    },
    {
        path: '/gamecreation',
        name: 'game creation',
        component: GameCreation,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router