import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Home';
import Vaccine from '../components/vaccine/Main';
import Crane from '../components/crane/CraneMain';
import Elecar from '../components/elecar/Elecar';
import ElecarMain from '../components/elecar/ElecarMain';
import ElecarList from '../components/elecar/ElecarList';
import ElecarRent from '../components/elecar/ElecarRent';
import DashBoard from '../components/DashBoard';

/* 용접기 */
import Welding from '../components/welding/Welding';
import WeldingMain from '../components/welding/WeldingMain';
import WeldingList from '../components/welding/WeldingList';

import Login from '../components/user/Login';
import SignUp from '../components/user/SignUp';
import UserManage from '../components/user/UserManage';

import api from '../api/api';
const routes = [
  {
    path: '/',
    name: 'DashBoard',
    redirect: 'home',
    component: DashBoard,
    meta: { auth: true },
    children: [
      {
        path: 'home',
        name: 'Main',
        component: Main,
      },
      {
        path: 'vaccine',
        name: 'Vaccine',
        component: Vaccine,
      },
      {
        path: 'crane',
        name: 'crane',
        component: Crane,
      },
      {
        path: 'elecar',
        name: 'elecar',
        component: Elecar,
        children: [
          {
            path: '',
            name: 'main',
            component: ElecarMain,
          },
          {
            path: 'list',
            name: 'list',
            component: ElecarList,
          },
          {
            path: 'rent',
            name: 'rent',
            component: ElecarRent,
          },
        ],
      },
      {
        path: 'welding',
        name: 'welding',
        component: Welding,
        children: [
          {
            path: '',
            name: 'weldingMain',
            component: WeldingMain,
          },
          {
            path: 'list',
            name: 'weldingList',
            component: WeldingList,
          },
        ],
      },
      {
        path: 'userManage',
        name: 'userManage',
        component: UserManage,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && api.getCookie('auth') == undefined) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

export default router;
