export default [
    {
        path: 'index',
        title: '小程序',
        name: 'MinApp-index',
        component: () => import('@/views/backend/minApp'),
        meta: { keepAlive: true, role: 180 }
    }
]