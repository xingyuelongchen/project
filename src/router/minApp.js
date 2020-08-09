export default [
    { path: 'minApp', name: 'MinApp', meta: { keepAlive: true, role: 22, title: '小程序', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'MinApp-index', component: () => import('@/views/backend/minApp'), meta: { keepAlive: true, role: 90, title: '小程序', } }
]