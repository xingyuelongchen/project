export default [
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/layou/backend'),
        redirect: 'user/info',
        meta: { isAuth: true, title: '个人中心', keepAlive: true, },
        children: [
            { path: 'info', name: 'Userinfo', meta: { keepAlive: true, title: '资料管理', }, component: () => import('@/views/user/info') },
        ]
    }, 
    {
        path: '*', redirect: '/error404'
    }
]