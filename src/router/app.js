export default [
    {
        path: 'index',
        title: 'App管理',
        name: 'app-index',
        component: () => import('@/views/backend/app'),
        meta: { keepAlive: true, role: 200 }
    }
]