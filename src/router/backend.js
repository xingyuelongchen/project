export default [
    {
        path: 'home',
        name: 'Home',
        title: '首页',
        component: () => import('@/views/backend/home'),
        meta: { keepAlice: true, role: 10, },
    },
    {
        path: 'a',
        name: 'A',
        title: 'a',
        component: () => import('@/views/backend/aaa'),
        meta: { keepAlice: true, role: 11, },

    },

]