export default [
    { path: 'web', name: 'web', meta: { keepAlive: false, role: 3, title: '官网', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'Web-index', component: () => import('@/views/backend/web/home'), meta: { keepAlive: false, role: 89, title: '官网管理' } },
    // 课程视频
    { path: 'video', name: 'Webvideo', component: () => import('@/views/layou'), meta: { keepAlive: false, role: 173, title: '课程管理' } },
    { path: 'upload', name: 'Webvideoupload', component: () => import('@/views/backend/web/video/upload'), meta: { keepAlive: false, role: 177, title: '上传课程' } },
    { path: 'class', name: 'Webvideoclass', component: () => import('@/views/backend/web/video/class'), meta: { keepAlive: false, role: 178, title: '课程分类' } },
    { path: 'class', name: 'Webvideoclass', component: () => import('@/views/backend/web/video/class'), meta: { keepAlive: false, role: 178, title: '课程系列' } },
    // 文章
    { path: 'article', name: 'Webarticle', component: () => import('@/views/layou'), meta: { keepAlive: false, role: 174, title: '文章管理' } },
    { path: 'publish', name: 'Webarticlepublish', component: () => import('@/views/backend/web/article/publish'), meta: { keepAlive: true, role: 182, title: '发布文章' } },
    { path: 'list', name: 'Webarticlelist', component: () => import('@/views/backend/web/article/list'), meta: { keepAlive: false, role: 183, title: '文章管理' } },
    { path: 'class', name: 'Webarticleclass', component: () => import('@/views/backend/web/article/class'), meta: { keepAlive: false, role: 184, title: '文章分类' } },
    // { path: 'class', name: 'Webarticleclass', component: () => import('@/views/backend/web/article/class'), meta: { keepAlive: false, role: 184, title: '文章分类' } },
    // 页面管理
    { path: 'pages', name: 'Webpages', component: () => import('@/views/layou'), meta: { keepAlive: false, role: 176, title: '页面管理' } },
    { path: 'list', name: 'Webpageslist', component: () => import('@/views/backend/web/pages/list'), meta: { keepAlive: false, role: 261, title: '页面管理' } },
    // 网站图库
    { path: 'images', name: 'Webimages', component: () => import('@/views/layou'), meta: { keepAlive: false, role: 175, title: '网站图库' } },
    { path: 'list', name: 'Webimageslist', component: () => import('@/views/backend/web/images/list'), meta: { keepAlive: false, role: 262, title: '图库管理' } },
    { path: 'class', name: 'Webimagesclass', component: () => import('@/views/backend/web/images/class'), meta: { keepAlive: false, role: 265, title: '图片分类' } },
    // 网站设置
    { path: 'websetting', name: 'Websetting', component: () => import('@/views/layou'), meta: { keepAlive: false, role: 263, title: '网站设置' } },
    { path: 'index', name: 'index', component: () => import('@/views/backend/web/setting'), meta: { keepAlive: false, role: 264, title: '网站设置' } },
]