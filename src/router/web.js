export default [
    {
        path: 'index',
        title: '官网管理',
        name: 'Web-index',
        component: () => import('@/views/backend/web'),
        meta: { keepAlive: true, role: 160 }
    }
]