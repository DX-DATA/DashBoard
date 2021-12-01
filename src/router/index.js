import { createRouter, createWebHistory } from "vue-router";
import Main from '../components/Home'
import Vaccine from '../components/vaccine/Main'
import Crane from '../components/crane/CraneMain'
import Elecar from '../components/elecar/Elecar'
import ElecarMain from '../components/elecar/ElecarMain'
import ElecarList from '../components/elecar/ElecarList'
import ElecarRent from '../components/elecar/ElecarRent'

const routes = [
    {
        path : '/',
        name : 'Main',
        component : Main
    },
    {
        path : '/vaccine',
        name : 'Vaccine',
        component : Vaccine
    },
    {
        path : '/crane',
        name : 'crane',
        component : Crane
    },
    {
        path : '/elecar',
        name : 'elecar',
        component : Elecar,
        children: [
            {
                path : '',
                name : 'main',
                component : ElecarMain
            },
            {
                path : 'list',
                name : 'list',
                component : ElecarList
            },
            {
                path : 'rent',
                name : 'rent',
                component : ElecarRent
            },
        ]
    },
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
});

export default router;