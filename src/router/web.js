export default [
    { path: 'web', name: 'web', meta: { keepAlive: true, role: 3, title: '官网', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'Web-index', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 89, title: '官网管理' } }
]