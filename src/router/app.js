export default [
    { path: 'app', name: 'app', meta: { keepAlive: true, role: 24, title: '应用程序', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'app-index', component: () => import('@/views/backend/app'), meta: { keepAlive: true, role: 88, title: '首页', } }
]