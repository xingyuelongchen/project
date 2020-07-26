export default [
    { path: 'index', name: 'app-index', component: () => import('@/views/backend/app'), meta: { keepAlive: true, role: 200, title: 'App管理', } }
]