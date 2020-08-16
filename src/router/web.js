export default [
    { path: 'web', name: 'web', meta: { keepAlive: true, role: 3, title: '官网', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'Web-index', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 89, title: '官网管理' } },
    // 课程视频
    { path: 'video', name: 'Webvideo', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 173, title: '课程管理' } },
    { path: 'uploadvideo', name: 'Webuploadvideo', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 177, title: '上传课程' } },
    { path: 'classvideo', name: 'Webclassvideo', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 178, title: '课程分类' } },
    // 文章
    { path: 'article', name: 'Webarticle', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 174, title: '文章管理' } },
    { path: 'publish', name: 'Articlepublish', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 89, title: '发布文章' } },
    { path: 'manage', name: 'Articlemanage', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 89, title: '文章管理' } },
    { path: 'classarticle', name: 'Articleclassarticle', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 89, title: '文章分类' } },
    // 页面管理
    { path: 'pages', name: 'Webpages', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 176, title: '页面管理' } },
    // 网站图库
    { path: 'images', name: 'Webimages', component: () => import('@/views/backend/web'), meta: { keepAlive: true, role: 175, title: '网站图库' } },

]