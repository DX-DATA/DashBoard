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
import WeldingMain from '../components/welding/main/WeldingMain';
import WeldingList from '../components/welding/WeldingList';

import Login from '../components/user/Login';
import SignUp from '../components/user/SignUp';
import UserManage from '../components/user/UserManage';

/* 공지 */
import Notice from '../components/notice/Notice.vue';
import NoticePost from '../components/notice/NoticePost.vue';

/* 새로운 디자인 */
import newDashBoard from '../components/new/DashBoard.vue';

import newElecarMain from '../components/new/elecar/ElecarMain.vue';
import newElecar from '../components/new/elecar/Elecar.vue';
import newElecarList from '../components/new/elecar/ElecarList.vue';

/* 공지 */
import newNotice from '../components/new/notice/Notice.vue';
import newNoticePost from '../components/new/notice/NoticePost.vue';

import api from '../api/api';
const routes = [
  {
    path: '/',
    name: 'DashBoard',
    redirect: 'notice',
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
        path: 'notice',
        name: 'notice',
        component: Notice,
      },
      {
        path: 'notice/:id',
        name: 'noticePost',
        component: NoticePost,
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
  {
    path: '/newboard',
    name: 'newboard',
    component: newDashBoard,
    children: [
      {
        path: 'elecar',
        name: 'newelecar',
        component: newElecar,
        children: [
          {
            path: '',
            name: 'newmain',
            component: newElecarMain,
          },
          {
            path: 'list',
            name: 'newlist',
            component: newElecarList,
          },
          {
            path: 'rent',
            name: 'newrent',
            component: ElecarRent,
          },
        ],
      },
      {
        path: 'notice',
        name: 'newnotice',
        component: newNotice,
      },
      {
        path: 'notice/:id',
        name: 'newnoticePost',
        component: newNoticePost,
      },
    ],
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
